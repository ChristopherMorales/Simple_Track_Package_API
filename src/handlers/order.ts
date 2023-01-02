import prisma from "../db"
import axios from 'axios';

// Get all
export const getOrders = async (req, res) => {
  const user = await prisma.user.findUnique({
    where: {
      id: req.user.id
    },
    include: {
      orders: true
    }
  })

  res.json({data: user.orders})
}

// Get one
export const getOneOrder = async (req, res) => {
  const id = req.params.id

  const order = await prisma.order.findFirst({
    where: {
      id,
      belongsToId: req.user.id
    }
  })

  res.json({data: order})
}

// Create one
export const createOrder = async (req, res) => {

  let response;
  let fetchUser;

  try {
    response = await axios.get('https://random-data-api.com/api/v2/appliances?size=1');
    console.log("🚀 ~ file: order.ts:37 ~ createOrder ~ response", response.data)
    fetchUser = await axios.get('https://random-data-api.com/api/v2/users?size=l');
    console.log("🚀 ~ file: order.ts:39 ~ createOrder ~ fetchUser", fetchUser.data)

  } catch (error) {
    console.error(error);
  }  

  if (!response.data && !fetchUser.data) {
    return res.status(500).send({ message: 'User or order not found'})
  }

  const {first_name, last_name, email, address } = fetchUser.data;
  const { brand, equipment } = response.data;

  const order = await prisma.order.create({
    data: {
      brand: brand,
      equipment: equipment,
      address: `${first_name} ${last_name} ${address.street_address} ${address.street_address} ${address.city} ${address.state} ${address.country}`,
      belongsToId: req.user.id
    }
  })

  const {user} = req

  const tempData = {
    params: {
      id: order.id
    },
    user
  }


  res.json({data: order})
}


// Update one
export const updateOrder = async (req, res) => {
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

  res.json({data: updated})
}

// Delete one
export const deleteOrder = async (req, res) => {
  const deleted = await prisma.order.delete({
    where: {
      id_belongsToId: {
        id: req.params.id,
        belongsToId: req.user.id
      }
    }
  })

  res.json({data: deleted})
}