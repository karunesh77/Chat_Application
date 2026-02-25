
import Chat from "../models/chatModels.js";
import User from "../models/userModels.js";





/**
 * Access a chat between two users
 * @param {req} express request object
 * @param {res} express response object
 * @returns {Promise<void>} resolves when the chat is accessed
 */
const accessChat = async (req, res) => {
    const { userId } = req.body;
    console.log("this is userId from accessChat controller ", userId);

    if (!userId) {
        console.log("UserId param not sent with request");
        return res.sendStatus(400);
    }

    /**
     * Check if the chat already exists
     * between the two users
     */
    var isChat = await Chat.find({
        isGroupChat: false,
        $and: [
           { users: { $elemMatch: { $eq: req.user._id } } },
           { users: { $elemMatch: { $eq: userId } } },
        ],
    })
        .populate("users", "-password")
        .populate("latestMessage");

    /**
     * Populate the latest message sender
     * field with user details
     */
    isChat = await User.populate(isChat, {
        path: "latestMessage.sender",
        select: "name pic email",
    });

    if (isChat.length > 0) {
        res.send(isChat[0]);
    } else {
        /**
         * Create a new chat between the two users
         */
        var chatData = {
            chatName: "sender",
            isGroupChat: false,
            users: [req.user._id, userId],
        };

        try {
            const createdChat = await Chat.create(chatData);
            const FullChat = await Chat.findOne({ _id: createdChat._id }).populate(
                "users",
                "-password"
            );
            res.status(200).send(FullChat);
        } catch (error) {
            res.status(400).send(error.message);
        }
    }
};





/**
 * Fetch all the chats that the user is a part of
 * @param {req} express request object
 * @param {res} express response object
 * @returns {Promise<void>} resolves when the chats are fetched
 */
const fetchChats = async (req, res) => {
    try {
        // find all the chats that the user is a part of
        const chats = await Chat.find({ users: { $elemMatch: { $eq: req.user._id } } })
            // populate the chats with the users and the latest message
            .populate("users", "-password")
            .populate("groupAdmin", "-password")
            .populate("latestMessage")
            // sort the chats in descending order of updatedAt
            .sort({ updatedAt: -1 });

        // populate the latest message with the sender
        const populatedChats = await User.populate(chats, {
            path: "latestMessage.sender",
            select: "name pic email",
        });

        res.status(200).send(populatedChats);
    } catch (error) {
        res.status(400);
        throw new Error(error.message);
    }
};

/**
 * Create a new group chat
 * @param {req} express request object
 * @param {res} express response object
 * @returns {Promise<void>} resolves when the group chat is created
 */
// const createGroupChat = async (req, res) => {

//     if(!req.body.users || !req.body.name) {
//         return res.status(400).json({ message: "Please fill all the fields" });
//     }
//     if(JSON.parse(req.body.users).length < 2) {
//         return res.status(400).json({ message: "More than 2 users are required to form a group chat" });
//     }
    
//     try {
//         // create a new group chat
//         const newChat = await Chat.create({
//             // name of the group chat
//             chatName: req.body.name,
//             // users in the group chat
//             users: JSON.parse(req.body.users),
//             // boolean indicating whether the chat is a group chat
//             isGroupChat: true,
//             // the user who created the group chat
//             groupAdmin: req.user,
//         });

//         // send the newly created group chat as a response
//         res.status(201).json(newChat);
//     } catch (err) {
//         // send an error message if the group chat creation fails
//         res.status(400).json({ message: err.message });
//     }
// };




export { accessChat, fetchChats };