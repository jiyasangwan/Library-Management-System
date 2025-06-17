import cron from "node-cron";
import { Borrow } from "../models/borrowModel.js";
import { User } from "../models/userModel.js";
import { sendEmail } from "../utils/sendEmail.js";


export const notifyUsers=()=>{
    cron.schedule("*/30 * * * * *",async()=>{
        try{
            const oneDayAgo=new Date(Date.now()-24*60*60*1000);
            const borrowers=await Borrow.find({
                dueDate:{
                    $lt: oneDayAgo
                },
                returnDate: null,
                notified: false,
            });

            for(const element of borrowers){
                if(element.user && element.user.email){
                    const user= await User.findById(element.user.id);
                    sendEmail({
                        email:element.user.email,
                        subject:"Book Return Reminder",
                        message:`<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px; background-color: #fefefe; color: #000;">
  <h2 style="color: #333; text-align: center;">Book Return Reminder</h2>

  <p style="font-size: 16px; color: #555;">Dear ${element.user.name},</p>

  <p style="font-size: 16px; color: #555;">
    This is a friendly reminder that the book you borrowed is due for return <strong>tomorrow.</strong>.
  </p>


  <p style="font-size: 16px; color: #555;">
    Please return the book by the due date to avoid any late fees. If you've already returned it, kindly ignore this message.
  </p>

  <footer style="margin-top: 30px; text-align: center; font-size: 14px; color: #888;">
    <p>Thank you,<br><strong>BookAura Library</strong></p>
    <p style="font-size: 12px;">This is an automated message. Please do not reply to this email.</p>
  </footer>
</div>`
                    });
                    element.notified=true;
                    await element.save();
                    console.log(`Email sent to ${element.user.name}`);
                }
            }
        }catch(error){
            console.error("Some error occured while notifying users.", error);
        }
    });
};