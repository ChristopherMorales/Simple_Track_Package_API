import { Router } from 'express'
import { createOrder, deleteOrder, getOneOrder, updateOrder, getOrders } from './handlers/order'
import { createNewUser, signin } from './handlers/user'
import { protect } from './modules/auth'

const router = Router()

router.get('/order', protect, getOrders, () => {
  /*
    #swagger.auto = false
    #swagger.tags = ['Order']
    #swagger.description = 'This endpoint is for retrieving all orders of a specific user from the server.'
    #swagger.security = [ { "bearerAuth": [] } ]
  */
})

router.get('/order/:id', protect, getOneOrder, () => {
  /*
    #swagger.auto = false
    #swagger.tags = ['Order']
    #swagger.description = 'This endpoint is for getting a specific order from the user.'
    #swagger.parameters['id'] = {
      in: 'path',
      description: 'Id of the order',
      type: 'string',
      required: true
    }
    #swagger.security = [ { "bearerAuth": [] } ]
  */
})

router.post('/order', protect, createOrder, () => {
  /*
    #swagger.auto = false
    #swagger.description = 'This endpoint is for creating random orders from the user.'
    #swagger.tags = ['Order']
    #swagger.security = [ { "bearerAuth": [] } ]
  */
})

router.put('/order/:id', protect, updateOrder, () => {
  /*
    #swagger.auto = false
    #swagger.description = 'This endpoint is for editing brand and equipment orders from the user.'
    #swagger.tags = ['Order']
    #swagger.parameters['id'] = {
      in: 'path',
      description: 'Id of the order',
      type: 'string',
      required: true
    }
    #swagger.parameters['brand'] = {
      in: 'body',
      description: 'Brand of the item',
      schema: {
                    $brand: 'Amazon',
                    $equipment: 'Echo dot',
                }
    }
    #swagger.security = [ { "bearerAuth": [] } ]
  */

})

router.delete('/order/:id', protect, deleteOrder, () => {
  /*
    #swagger.auto = false
    #swagger.tags = ['Order']
    #swagger.description = 'This endpoint is for deleting specific order from the user.'
    #swagger.parameters['id'] = {
      in: 'path',
      description: 'Id of the order',
      type: 'string',
      required: true
    }
    #swagger.security = [ { "bearerAuth": [] } ]
  */
})

router.post('/signup', createNewUser, () => {

  /*
   #swagger.auto = false
   #swagger.tags = ['User']
   #swagger.parameters['body'] = {
       in: 'body',
       description: 'Credentials',
       schema: {
                 $username: '',
                 $password: '',
               }
     }
  */
})
router.post('/login', signin, () => {
  /*
   #swagger.auto = false
   #swagger.tags = ['User']
   #swagger.parameters['body'] = {
      in: 'body',
      description: 'Credentials',
      schema: {
                $username: '',
                $password: '',
              }
    }
  */
})

export default router
