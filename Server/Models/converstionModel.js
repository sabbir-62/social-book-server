const mongoose = require('mongoose');

const conversationSchema = new mongoose.Schema(
	{
		participants: [{ type: mongoose.Schema.Types.ObjectId, ref: "userProfile" }],
		lastMessage: {
			text: String,
			sender: { type: mongoose.Schema.Types.ObjectId, ref: "userProfile" },
			seen: {
				type: Boolean,
				default: false,
			},
		},
	},
	{ timestamps: true }
);

const Conversation = mongoose.model("Conversation", conversationSchema);

module.exports = Conversation;