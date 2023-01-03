import prisma from "../db"
import axios from 'axios';

// Get all
export const getOrders = async (req, res, next) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: req.user.id
      },
      include: {
        orders: true
      }
    })

    res.json({ data: user.orders })
  } catch (error) {
    console.log(error)
    next(error)
  }
}

// Get one
export const getOneOrder = async (req, res, next) => {
  try {
    const id = req.params.id

    const order = await prisma.order.findFirst({
      where: {
        id,
        belongsToId: req.user.id
      }
    })

    res.json({ data: order })
  } catch (error) {
    next(error)
  }
}

// Create one
export const createOrder = async (req, res, next) => {

  let response;
  let fetchUser;

  try {
    response = await axios.get('https://random-data-api.com/api/v2/appliances?size=1');
    fetchUser = await axios.get('https://random-data-api.com/api/v2/users?size=1');
  } catch (error) {
    console.log(error);
    next(error)
  }

  if (!response.data && !fetchUser.data) {
    return res.status(500).send({ message: 'User or order not found' })
  }

  const { first_name, last_name, address } = fetchUser.data;
  const { brand, equipment } = response.data;

  try {
    const order = await prisma.order.create({
      data: {
        brand: brand,
        equipment: equipment,
        address: `${first_name} ${last_name} ${address.street_address} ${address.street_address} ${address.city} ${address.state} ${address.country}`,
        belongsToId: req.user.id
      }
    })

    res.json({ data: order })

  } catch (error) {
    console.log(error)
    next(error)
  }

}


// Update one
export const updateOrder = async (req, res, next) => {
  try {
    const updated = await prisma.order.update({
      where: {
        id_belongsToId: {
          id: req.params.id,
          belongsToId: req.user.id
        }
      },
      data: {
        status: req.body.status
      }
    })

    res.json({ data: updated })
  } catch (error) {
    console.log(error)
    next(error)
  }
}

// Delete one
export const deleteOrder = async (req, res, next) => {
  try {
    const deleted = await prisma.order.delete({
      where: {
        id_belongsToId: {
          id: req.params.id,
          belongsToId: req.user.id
        }
      }
    })

    res.json({ data: deleted })
  } catch (error) {
    console.log(error)
    next(error)
  }
}