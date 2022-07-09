addLayer("p", {
    name: "azucar", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "a", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "FFFFFF",
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "azucar", // Name of prestige currency
    baseResource: "points", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    gainMult() {
        let mult = new Decimal(1)
        if (hasUpgrade('p', 13)) mult = mult.times(upgradeEffect('p', 13))
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
            title: "Mixing",
            description: "Double your point gain.",
            cost: new Decimal(1),
        },
        12: {
            title: "BAttung",
            description: "best.",
            cost: new Decimal(2),
            effect() {
                return player[this.layer].points.add(1).pow(2)
            },
        },
        13: {
            title: "BAttung",
            description: "best.",
            cost: new Decimal(2),
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
            done() { return player.p.points.gte(123) }
            
        }
        
    }
    
})
