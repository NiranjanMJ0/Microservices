import {Schema , model} from "mongoose"
import {Product} from "../../../ProductServices/src/models/Products.Models.js"
import { OrderStatus } from "../DB/orderstatus.js";



export const OrderItemSchema = new Schema({
      food: {type:Product.schema, required :true},
      price:{type:Number, required:true},
      quantity: {type:Number, required:true },
},
{
      _id :false
}
);

OrderItemSchema.pre('validate',function(next){
      this.price = this.food.price * this.quantity
      next();
});

const orderSchema = new Schema({
      name : {type:String, required:true},
      //address: {type :String , required : true},
      totalPrice: {type : Number, required:true},
      items: {type: [OrderItemSchema], required : true},
      status: {type : String , default : OrderStatus.NEW},
      user: {type : Schema.Types.ObjectId , required :true }
},
{
      timestamps:true
});

export const OrderSchema = model("Orderschema" , orderSchema)
export const OISchema = model("OISchema" , OrderItemSchema)

