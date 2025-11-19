// src/constants/tiers.js

// src/constants/tiers.js

import tier1img from "../assets/tier1.png";
import tier2img from "../assets/tier2.png";
import tier3img from "../assets/tier3.png";
import tier4img from "../assets/tier4.png";

export const TIERS = [
    {
        name: "Tier 1",
        xp: 0,
        img: tier1img,
        benefits: [
            "5% Welcome Discount",
            "Basic Support",
            "Earn 1x XP Multiplier"
        ]
    },
    {
        name: "Tier 2",
        xp: 1250,
        img: tier2img,
        benefits: [
            "10% Birthday Reward",
            "Priority Order Processing",
            "Earn 1.2x XP Multiplier",
            "Early Access to Some Drops"
        ]
    },
    {
        name: "Tier 3",
        xp: 3000,
        img: tier3img,
        benefits: [
            "15% Birthday Reward",
            "Exclusive Member Drops",
            "Earn 1.5x XP Multiplier",
            "VIP Support Line"
        ]
    },
    {
        name: "Tier 4",
        xp: 5000,
        img: tier4img,
        benefits: [
            "20% Birthday Reward",
            "Elite Early Access",
            "Earn 2x XP Multiplier",
            "Dedicated Account Manager",
            "Invitations to Exclusive Events"
        ]
    },
];


// Returns info about the user's tier based on current XP
export const getTierInfo = (currentXP) => {
    let currentTier = TIERS[0];
    let nextTier = TIERS[TIERS.length - 1];

    for (let i = 0; i < TIERS.length; i++) {
        if (currentXP >= TIERS[i].xp) {
            currentTier = TIERS[i];
            nextTier = TIERS[i + 1] || TIERS[i];
        }
    }

    const totalXP = nextTier.xp;
    const xpToGo = totalXP - currentXP;
    const percent = Math.min((currentXP / totalXP) * 100, 100);

    return {
        currentTier: currentTier.name,
        nextTier: nextTier.name,
        currentXP,
        totalXP,
        xpToGo: xpToGo < 0 ? 0 : xpToGo,
        percent,
        benefits: currentTier.benefits,
        nextTierBenefits: nextTier.benefits,
        img: currentTier.img
    };
};

