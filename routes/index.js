const Router = require('express').Router()

const MaincategoryRouter = require("./MaincategoryRoutes")
const SubcategoryRouter=require("./SubcategoryRoutes")
const BrandRouter=require("./BrandRoutes")
const TestimonialRouter = require('./TestimonialRoutes')
const ProductRouter = require('./ProductRoutes')
const UserRouter = require('./UserRoutes')
const CartRouter = require('./CartRoutes')
const WishlistRouter = require('./WishlistRoutes')
const CheckoutRouter = require('./CheckoutRoutes')
const NewsletterRouter = require('./NewsletterRoutes')

const ContactUsRouter = require('./ContactUsRoutes')



Router.use("/maincategory",MaincategoryRouter)
Router.use("/subcategory",SubcategoryRouter)
Router.use("/brand",BrandRouter)
Router.use("/testimonials",TestimonialRouter)
Router.use("/product",ProductRouter)
Router.use("/user",UserRouter)
Router.use("/cart",CartRouter)
Router.use("/wishlist",WishlistRouter)
Router.use("/checkout",CheckoutRouter)
Router.use("/newsletter",NewsletterRouter)
Router.use("/contactus",ContactUsRouter)
module.exports  = Router







//note we have to use it in main file index .js 