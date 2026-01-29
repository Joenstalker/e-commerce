import { requireAuth } from "@clerk/express";
import { User } from "../models/user.model.js";
import { ENV } from "../config/env.js";

async function fetchClerkUser(userId) {
  if (!ENV.CLERK_SECRET_KEY) {
    throw new Error("Missing CLERK_SECRET_KEY");
  }

  const res = await fetch(`https://api.clerk.com/v1/users/${userId}`, {
    headers: {
      Authorization: `Bearer ${ENV.CLERK_SECRET_KEY}`,
    },
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Clerk API error ${res.status}: ${text}`);
  }

  return await res.json();
}

export const protectRoute = [
  requireAuth(),
  async (req, res, next) => {
    try {
      const clerkId = req.auth().userId;
      if (!clerkId) return res.status(401).json({ message: "Unauthorized - invalid token" });

      let user = await User.findOne({ clerkId });

      // If the user doesn't exist in MongoDB yet (e.g. webhooks not configured),
      // create it on-demand from Clerk so the app can function.
      if (!user) {
        const clerkUser = await fetchClerkUser(clerkId);

        const primaryId = clerkUser.primary_email_address_id;
        const emails = clerkUser.email_addresses || [];
        const primary = primaryId
          ? emails.find((e) => e.id === primaryId)
          : emails[0];
        const email = primary?.email_address || emails[0]?.email_address || "";

        if (!email) {
          throw new Error("Could not resolve email from Clerk. Ensure your Clerk user has an email.");
        }

        const name =
          [clerkUser.first_name, clerkUser.last_name].filter(Boolean).join(" ").trim() || "User";

        try {
          user = await User.create({
            clerkId,
            email,
            name,
            imageUrl: clerkUser.image_url || "",
            addresses: [],
            wishlist: [],
          });
        } catch (createErr) {
          if (createErr?.code === 11000) {
            user = await User.findOne({ clerkId });
          }
          if (!user) throw createErr;
        }
      }

      req.user = user;

      next();
    } catch (error) {
      console.error("Error in protectRoute middleware", error);
      res.status(500).json({ message: "Internal server error" });
    }
  },
];

export const adminOnly = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ message: "Unauthorized - user not found" });
  }

  if (req.user.email !== ENV.ADMIN_EMAIL) {
    return res.status(403).json({ message: "Forbidden - admin access only" });
  }

  next();
};
