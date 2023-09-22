//---
var DATA = {
    //---
    scenarios:[
        //---
        {   id:'fto1', img:'img/fto1/', label:'fto1_', initSubTab:'objectives', initItem:'armor',
            subTabs:[
                //---
                { id:'objectives', label:'objectives', categories:[ 'mission', 'science', 'tech' ] },
                { id:'items', label:'items', categories:[ 'stone', 'iron', 'copper', 'product' ] },
                { id:'production', label:'production', categories:[ 'energy', 'machine' ] },
            ],
            items:[
                //---
                { id:'manual', label:'manual', img:'manual.png', speed:0.5 },
                //---
                { id:'coal', label:'coal', img:'coal.png', category:'energy', stack:50, limits:[ 1, 5, 10, 25] },
                { id:'water', reqs:{ 'armor':1 }, label:'water', img:'water.png', category:'energy', stack:25e3 },
                { id:'steam', reqs:{ 'armor':1 }, label:'steam', img:'steam.png', category:'energy', stack:25e3 },
                { id:'electricity', reqs:{ 'armor':1 }, label:'electricity', img:'electricity.png', category:'energy', stack:5e3 },
                //---
                { id:'stone', label:'stone', img:'stone.png', category:'stone', stack:50, limits:[ 1, 5, 10, 25] },
                //---
                { id:'iron-ore', label:'iron-ore', img:'iron-ore.png', category:'iron', stack:50, limits:[ 1, 5, 10, 25] },
                { id:'iron-plate', label:'iron-plate', img:'iron-plate.png', category:'iron', stack:100 },
                { id:'pipe', reqs:{ 'armor':1 }, label:'pipe', img:'pipe.png', category:'iron', stack:100, limits:[ 1, 5, 10, 25] },
                { id:'gear', reqs:{ 'armor':1 }, label:'gear', img:'gear.png', category:'iron', stack:100, limits:[ 1, 5, 10, 25] },
                { id:'belt', reqs:{ 'armor':1 }, label:'belt', img:'belt.png', category:'iron', stack:100, limits:[ 1, 5, 10, 25] },
                //---
                { id:'copper-ore', reqs:{ 'armor':1 }, label:'copper-ore', img:'copper-ore.png', category:'copper', stack:50, limits:[ 1, 5, 10, 25] },
                { id:'copper-plate', reqs:{ 'armor':1 }, label:'copper-plate', img:'copper-plate.png', category:'copper', stack:100 },
                { id:'copper-cable', reqs:{ 'armor':1 }, label:'copper-cable', img:'copper-cable.png', category:'copper', stack:200, limits:[ 1, 5, 10, 25] },
                //---
                { id:'circuit', reqs:{ 'armor':1 }, label:'circuit', img:'circuit.png', category:'product', stack:200, limits:[ 1, 5, 10, 25] },
                //---
                { id:'armor', label:'armor', img:'armor.png', category:'mission', goal:1, limits:[ 1 ] },
                //---
                { id:'furnace', label:'furnace', img:'furnace.png', category:'machine', speed:1, energy:{ 'coal':0.0225 }, limits:[ 1, 5, 10, 25] },
                { id:'drill', reqs:{ 'armor':1 }, label:'drill', img:'drill.png', category:'machine', speed:0.25, energy:{ 'coal':0.0375 }, limits:[ 1, 5, 10, 25] },
                { id:'pump', reqs:{ 'armor':1 }, label:'pump', img:'pump.png', category:'machine', speed:1, limits:[ 1, 5, 10, 25] },
                { id:'boiler', reqs:{ 'armor':1 }, label:'boiler', img:'boiler.png', category:'machine', speed:1, energy:{ 'coal':0.45 }, limits:[ 1, 5, 10, 25] },
                { id:'steam-engine', reqs:{ 'armor':1 }, label:'steam-engine', img:'steam-engine.png', category:'machine', speed:1, energy:{ 'steam':30 }, limits:[ 1, 5, 10, 25] },
                { id:'lab', reqs:{ 'armor':1 }, label:'lab', img:'lab.png', category:'machine', speed:1, energy:{ 'electricity':60 }, limits:[ 1, 5, 10, 25] },
                { id:'assembler', reqs:{ 'automation':10 }, label:'assembler', img:'assembler.png', category:'machine', speed:1, energy:{ 'electricity':75 }, limits:[ 1, 5, 10, 25] },
                //---
                { id:'red-pack', reqs:{ 'armor':1 }, label:'red-pack', img:'red-pack.png', category:'science', stack:200, limits:[ 1, 5, 10, 25] },
                //---
                { id:'steel-tech', reqs:{ 'armor':1 }, label:'steel-tech', img:'steel-tech.png', category:'tech', goal:50 },
                { id:'automation', reqs:{ 'armor':1 }, label:'automation', img:'automation.png', category:'tech', goal:10 },
            ],
            recipes:[
                //---
                { id:'stone', machines:[ 'drill', 'manual' ], seconds:1, outputId:'stone', outputCount:1 },
                //---
                { id:'coal', machines:[ 'drill', 'manual' ], seconds:1, outputId:'coal', outputCount:1 },
                { id:'water', machines:[ 'pump' ], seconds:1, outputId:'water', outputCount:1200 },
                { id:'steam', machines:[ 'boiler' ], seconds:1, outputId:'steam', outputCount:60, inputs:{ 'water':60 } },
                { id:'coal-energy', machines:[ 'steam-engine' ], seconds:1, outputId:'electricity', outputCount:900 },
                //---
                { id:'iron-ore', machines:[ 'drill', 'manual'  ], seconds:1, outputId:'iron-ore', outputCount:1 },
                { id:'iron-plate', machines:[ 'furnace' ], seconds:3.2, outputId:'iron-plate', outputCount:1, inputs:{ 'iron-ore':1 } },
                { id:'pipe', machines:[ 'assembler', 'manual' ], seconds:0.5, outputId:'pipe', outputCount:1, inputs:{ 'iron-plate':1 } },
                { id:'gear', machines:[ 'assembler', 'manual' ], seconds:0.5, outputId:'gear', outputCount:1, inputs:{ 'iron-plate':2 } },
                { id:'belt', machines:[ 'assembler', 'manual' ], seconds:0.5, outputId:'belt', outputCount:2, inputs:{ 'gear':1, 'iron-plate':1 } },
                //---
                { id:'copper-ore', machines:[ 'drill', 'manual' ], seconds:1, outputId:'copper-ore', outputCount:1 },
                { id:'copper-plate', machines:[ 'furnace' ], seconds:3.2, outputId:'copper-plate', outputCount:1, inputs:{ 'copper-ore':1 } },
                { id:'copper-cable', machines:[ 'assembler', 'manual' ], seconds:0.5, outputId:'copper-cable', outputCount:2, inputs:{ 'copper-plate':1 } },
                //---
                { id:'circuit', machines:[ 'assembler', 'manual' ], seconds:0.5, outputId:'circuit', outputCount:1, inputs:{ 'copper-cable':3, 'iron-plate':1 } },
                //---
                { id:'furnace', machines:[ 'manual' ], seconds:0.5, outputId:'furnace', outputCount:1, inputs:{ 'stone':5 } },
                { id:'drill', machines:[ 'manual' ], seconds:2, outputId:'drill', outputCount:1, inputs:{ 'gear':3, 'iron-plate':3, 'furnace':1 } },
                { id:'pump', machines:[ 'manual' ], seconds:0.5, outputId:'pump', outputCount:1, inputs:{ 'circuit':2, 'gear':1, 'pipe':1 } },
                { id:'boiler', machines:[ 'manual' ], seconds:0.5, outputId:'boiler', outputCount:1, inputs:{ 'pipe':4, 'furnace':1 } },
                { id:'steam-engine', machines:[ 'manual' ], seconds:0.5, outputId:'steam-engine', outputCount:1, inputs:{ 'gear':8, 'iron-plate':10, 'pipe':5 } },
                { id:'lab', machines:[ 'manual' ], seconds:2, outputId:'lab', outputCount:1, inputs:{ 'circuit':10, 'gear':10, 'belt':4 } },
                { id:'assembler', machines:[ 'manual' ], seconds:0.5, outputId:'assembler', outputCount:1, inputs:{ 'circuit':3, 'gear':5, 'iron-plate':9 } },
                //---
                { id:'armor', machines:[ 'manual' ], seconds:3, outputId:'armor', outputCount:1, inputs:{ 'iron-plate':40 } },
                //---
                { id:'red-pack', machines:[ 'assembler', 'manual' ], seconds:5, outputId:'red-pack', outputCount:1, inputs:{ 'copper-plate':1, 'gear':1 } },
                //---
                { id:'steel-tech', machines:[ 'lab' ], seconds:5, outputId:'steel-tech', outputCount:1, inputs:{ 'red-pack':1 } },
                { id:'automation', machines:[ 'lab' ], seconds:10, outputId:'automation', outputCount:1, inputs:{ 'red-pack':1 } },
            ],
        },
    ]
}
