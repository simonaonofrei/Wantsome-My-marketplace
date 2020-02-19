const Chance = require("chance")
const express = require("express")

const dressesRoutes = express.Router()
const chance = new Chance()

const generateColor = () =>
  chance
    .color({ format: "hex" })
    .replace("#", "")
    .toUpperCase()

const dresses = Array.from({ length: 25 }, (_, i) => {
  const name = chance.pickone([
    "Paisley model dress",
    "Lether type eco dress",
    "Polka dots dress",
    "Cream Chiffon Pedal Dress",
    "Red Copper Hobbs Matilda Dress"
  ])

  const startColor = generateColor()
  const endColor = generateColor()

  return {
    id: chance.guid(),
    price: chance.dollar(),
    name,
    description: chance.paragraph({ sentences: 3 }),
    image: `http://placeimg.com/300/300/people`,
    info: {
      listingNumber: chance.bb_pin(),
      referenceNumber: chance.bb_pin(),
      model: chance.word({ capitalize: true }),
      brand: name,
      year: chance.year({ min: 1600, max: 2019 }),
      gender: chance.gender()
    },
    calibre: {
      powerReserve: chance.natural({ min: 10, max: 50 }),
      movement: chance.pickone(["Automatic", "Manual"]),
      movementPerCalibre: chance.natural({ min: 1000, max: 5000 })
    },
    case: {
      material: chance.pickone(["leather", "gold", "steel"]),
      diameter: chance.natural({ min: 30, max: 60 }),
      glass: chance.pickone([
        "red",
        "blue",
        "green",
        "salmon",
        "brown",
        "black"
      ])
    },
    strap: {
      material: chance.pickone(["leather", "gold", "steel"]),
      braceletColor: chance.pickone([
        "red",
        "blue",
        "green",
        "salmon",
        "brown",
        "black"
      ])
    }
  }
})

dressesRoutes.get("/", (req, res) => {
  res.json(watches)
})

dressesRoutes.get("/:todoId", (req, res) => {
  const dressId = req.params.todoId

  res.json(dresses.find(w => w.id == dressId))
})

module.exports = dressesRoutes