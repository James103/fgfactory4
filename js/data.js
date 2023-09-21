//---
var DATA = {
    //---
    scenarios:[
        //---
        {   id:'fto1', img:'img/fto1/', label:'fto1_', initSubTab:'items', initItem:'coal',
            subTabs:[
                //---
                { id:'items', label:'items', categories:[ 'stone', 'iron', 'copper', 'product' ] },
                { id:'machines', label:'machines', categories:[ 'energy', 'machine' ] },
                { id:'techs', label:'techs', categories:[ 'science', 'tech' ] },
            ],
            items:[
                //---
                { id:'manual', label:'manual', img:'manual.png', speed:0.5, limits:[ 1, 5, 10, 25] },
                //---
                { id:'coal', label:'coal', img:'coal.png', category:'energy', stack:50 },
                { id:'water', label:'water', img:'water.png', category:'energy', stack:25e3 },
                { id:'steam', label:'steam', img:'steam.png', category:'energy', stack:25e3 },
                { id:'electricity', label:'electricity', img:'electricity.png', category:'energy', stack:5e3 },
                //---
                { id:'stone', label:'stone', img:'stone.png', category:'stone', stack:50 },
                //---
                { id:'iron-ore', label:'iron-ore', img:'iron-ore.png', category:'iron', stack:50 },
                { id:'iron-plate', label:'iron-plate', img:'iron-plate.png', category:'iron', stack:100 },
                { id:'pipe', label:'pipe', img:'pipe.png', category:'iron', stack:100 },
                { id:'gear', label:'gear', img:'gear.png', category:'iron', stack:100 },
                { id:'belt', label:'belt', img:'belt.png', category:'iron', stack:100 },
                //---
                { id:'copper-ore', label:'copper-ore', img:'copper-ore.png', category:'copper', stack:50 },
                { id:'copper-plate', label:'copper-plate', img:'copper-plate.png', category:'copper', stack:100 },
                { id:'copper-cable', label:'copper-cable', img:'copper-cable.png', category:'copper', stack:200 },
                //---
                { id:'circuit', label:'circuit', img:'circuit.png', category:'product', stack:200 },
                //---
                { id:'furnace', label:'furnace', img:'furnace.png', category:'machine', speed:1, energy:{ 'coal':0.0225 } },
                { id:'drill', label:'drill', img:'drill.png', category:'machine', speed:0.25, energy:{ 'coal':0.0375 } },
                { id:'pump', label:'pump', img:'pump.png', category:'machine', speed:1 },
                { id:'boiler', label:'boiler', img:'boiler.png', category:'machine', speed:1, energy:{ 'coal':0.45 } },
                { id:'steam-engine', label:'steam-engine', img:'steam-engine.png', category:'machine', speed:1, energy:{ 'steam':30 } },
                { id:'lab', label:'lab', img:'lab.png', category:'machine', speed:1, energy:{ 'electricity':60 } },
                { id:'assembler', reqs:{ 'automation':10 }, label:'assembler', img:'assembler.png', category:'machine', speed:1, energy:{ 'electricity':75 } },
                //---
                { id:'red-pack', label:'red-pack', img:'red-pack.png', category:'science', stack:200 },
                //---
                { id:'automation', label:'automation', img:'automation.png', category:'tech', goal:10 },
            ],
            recipes:[
                //---
                { id:'stone', machines:[ 'drill', 'manual' ], seconds:1, outputs:{ 'stone':1 } },
                //---
                { id:'coal', machines:[ 'drill', 'manual' ], seconds:1, outputs:{ 'coal':1 } },
                { id:'water', machines:[ 'pump' ], seconds:1, outputs:{ 'water':1200 } },
                { id:'steam', machines:[ 'boiler' ], seconds:1, outputs:{ 'steam':60 }, inputs:{ 'water':60 } },
                { id:'coal-energy', machines:[ 'steam-engine' ], seconds:1, outputs:{ 'electricity':900 } },
                //---
                { id:'iron-ore', machines:[ 'drill', 'manual'  ], seconds:1, outputs:{ 'iron-ore':1 } },
                { id:'iron-plate', machines:[ 'furnace' ], seconds:3.2, outputs:{ 'iron-plate':1 }, inputs:{ 'iron-ore':1 } },
                { id:'pipe', machines:[ 'assembler', 'manual' ], seconds:0.5, outputs:{ 'pipe':1 }, inputs:{ 'iron-plate':1 } },
                { id:'gear', machines:[ 'assembler', 'manual' ], seconds:0.5, outputs:{ 'gear':1 }, inputs:{ 'iron-plate':2 } },
                { id:'belt', machines:[ 'assembler', 'manual' ], seconds:0.5, outputs:{ 'belt':2 }, inputs:{ 'gear':1, 'iron-plate':1 } },
                //---
                { id:'copper-ore', machines:[ 'drill', 'manual' ], seconds:1, outputs:{ 'copper-ore':1 } },
                { id:'copper-plate', machines:[ 'furnace' ], seconds:3.2, outputs:{ 'copper-plate':1 }, inputs:{ 'copper-ore':1 } },
                { id:'copper-cable', machines:[ 'assembler', 'manual' ], seconds:0.5, outputs:{ 'copper-cable':2 }, inputs:{ 'copper-plate':1 } },
                //---
                { id:'circuit', machines:[ 'assembler', 'manual' ], seconds:0.5, outputs:{ 'circuit':1 }, inputs:{ 'copper-cable':3, 'iron-plate':1 } },
                //---
                { id:'furnace', machines:[ 'manual' ], seconds:0.5, outputs:{ 'furnace':1 }, inputs:{ 'stone':5 } },
                { id:'drill', machines:[ 'manual' ], seconds:2, outputs:{ 'drill':1 }, inputs:{ 'gear':3, 'iron-plate':3, 'furnace':1 } },
                { id:'pump', machines:[ 'manual' ], seconds:0.5, outputs:{ 'pump':1 }, inputs:{ 'circuit':2, 'gear':1, 'pipe':1 } },
                { id:'boiler', machines:[ 'manual' ], seconds:0.5, outputs:{ 'boiler':1 }, inputs:{ 'pipe':4, 'furnace':1 } },
                { id:'steam-engine', machines:[ 'manual' ], seconds:0.5, outputs:{ 'steam-engine':1 }, inputs:{ 'gear':8, 'iron-plate':10, 'pipe':5 } },
                { id:'lab', machines:[ 'manual' ], seconds:2, outputs:{ 'lab':1 }, inputs:{ 'circuit':10, 'gear':10, 'belt':4 } },
                { id:'assembler', machines:[ 'manual' ], seconds:0.5, outputs:{ 'assembler':1 }, inputs:{ 'circuit':3, 'gear':5, 'iron-plate':9 } },
                //---
                { id:'red-pack', machines:[ 'assembler', 'manual' ], seconds:5, outputs:{ 'red-pack':1 }, inputs:{ 'copper-plate':1, 'gear':1 } },
                //---
                { id:'automation', machines:[ 'lab' ], seconds:10, outputs:{ 'automation':1 }, inputs:{ 'red-pack':1 } },
            ],
        },
    ]
}
