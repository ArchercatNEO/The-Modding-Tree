addLayer("s", {
    name: "sales", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "s", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "FFFFFF",
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "sales", // Name of prestige currency
    baseResource: "points", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    gainMult() {
        let mult = new Decimal(1)
        if (hasUpgrade('s', 13)) mult = mult.times(upgradeEffect('s', 13))
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "p", description: "P: Reset for prestige points", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return true},
        

    upgrades: {
        11: {
            title: "Help your friend",
            description: "Giving your dev friend some money should get you more games right? Unlocks a new layer.",
            cost: new Decimal(5),
        },
        12: {
            title: "Help yourself",
            description: "Getting a full team should help you sell more. Unlocks a new layer",
            cost: new Decimal(5),
            effect() {
                return player[this.layer].points.add(1).pow(2)
            },
        },
        13: {
            title: "Advertise",
            description: "Getting people familiar with your brand should get faster sales. Unlocks a new layer",
            cost: new Decimal(5),
            effect() {
                return player.points.add(1).pow(2)
            },
        },
        14: {
            title: "BAttung",
            description: "bettert.",
            cost: new Decimal(2),
            effect() {
                return player.points.add(1).pow(2)
            },
        },
        15: {
            title: "inflate",
            description: "bettert.",
            cost: new Decimal(2),
            effect() {
                return player.points.add(1).pow(player[this.layer].points)
            },
        },
    
    },
    milestones: {
        0: {
            requirementDescription: "123 waffles",
            effectDescription: "blah",
            done() { return player.s.points.gte(123) }
            
        }
        
    }
    
})
