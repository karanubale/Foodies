import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from "stripe";
import { useNavigate } from "react-router-dom";

// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

// below code not working;
// const placeOrder = async (req, res) => {
//     const frontend_url = "http://localhost:5174"

//     try {
//         const newOrder = new orderModel({
//             userId: req.body.userId,
//             items: req.body.items,
//             amount: req.body.amount,
//             address: req.body.address,
//         })
//         await newOrder.save();
//         await userModel.findByIdAndUpdate(req.body.userId, { cartData: {} });

//         const line_items = req.body.items.map((item,index) => ({
//             price_data: {
//                 currency: 'inr',
//                 product_data: {
//                     name: item.name
//                 },
//                 unit_amount: item.price * 100 * 80
//             },
//             quantity: item.quantity
//         }))

//         line_items.push({
//             price_data: {
//                 currency: 'inr',
//                 product_data: {
//                     name: "Delivery charges"
//                 },
//                 unit_amount: 2 * 100 * 80
//             },
//             quantity: 1
//         })

//         const session = await stripe.checkout.sessions.create({
//             line_items: line_items,
//             mode: 'payment',
//             success_url: `${frontend_url}}/verify?success=true&orderId=${newOrder._id}`,
//             cancel_url: `${frontend_url}}/verify?success=false&orderId=${newOrder._id}`,
//         })
//         res.json({ success: true, session_url: session.url })
//     }
//     catch (error) {
//         console.log(error)
//         console.log("hiii");
//         res.json({ success: false, message: "Error" })
//     }
// }


// const placeOrder = async (req, res) => {
//     const navigate = useNavigate();
//     // const frontend_url = "http://localhost:5174";

//     try {
//         const newOrder = new orderModel({
//             userId: req.body.userId,
//             items: req.body.items,
//             amount: req.body.amount,
//             address: req.body.address,
//         });
//         console.log(newOrder);
//         await newOrder.save();
//         await userModel.findByIdAndUpdate(req.body.userId, { cartData: {} });
//         // alert("order noted")
//         // const line_items = req.body.items.map((item) => ({
//         //     price_data: {
//         //         currency: 'inr',
//         //         product_data: {
//         //             name: item.name,
//         //         },
//         //         unit_amount: item.price * 100 * 80,
//         //     },
//         //     quantity: item.quantity,
//         // }));

//         // line_items.push({
//         //     price_data: {
//         //         currency: 'inr',
//         //         product_data: {
//         //             name: "Delivery charges",
//         //         },
//         //         unit_amount: 2 * 100 * 80,
//         //     },
//         //     quantity: 1,
//         // });

//         // const session = await stripe.checkout.sessions.create({
//         //     line_items: line_items,
//         //     mode: 'payment',
//         //     success_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
//         //     cancel_url: `${frontend_url}/verify?success=false&orderId=${newOrder._id}`,
//         // });
//         // session.url
//         // res.json({ success: true, session_url: session.url });
//         res.json({ success: true });
//         navigate("/orders");
//         } catch (error) {
//             console.error("Error in placeOrder:", error);
//             res.json({ success: false, message: "Error", error: error.message });
//     }
// };

const placeOrder = async (req, res) => {
    try {
        const newOrder = new orderModel({
            userId: req.body.userId,
            items: req.body.items,
            amount: req.body.amount,
            address: req.body.address,
        });
        console.log(newOrder);
        await newOrder.save();
        await userModel.findByIdAndUpdate(req.body.userId, { cartData: {} });

        // Assuming you might want to handle the redirect or response in the frontend
        res.json({ success: true, orderId: newOrder._id });
    } catch (error) {
        console.error("Error in placeOrder:", error);
        res.status(500).json({ success: false, message: "Error", error: error.message });
    }
};



const userOrders = async (req, res) => {
    try {
        const orders = await orderModel.find({ userId: req.body.userId })
        res.json({ success: true, data: orders })

    }
    catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" })
    }
}

// listing orders for admin
const listOrders = async (req, res) => {
    try {
        const orders = await orderModel.find({});
        res.json({ success: true, data: orders })


    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" })
    }
}

//api for upding status of item selectd by admin

const updateStatus = async (req, res) => {
    try {
        await orderModel.findByIdAndUpdate(req.body.orderId, { status: req.body.status });
        res.json({ success: true, message: "Status updated" })
    }
    catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" })

    }
}
export { placeOrder, userOrders, listOrders, updateStatus };