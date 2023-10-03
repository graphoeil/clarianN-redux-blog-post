// Imports
import React from "react";

// RTK Query
import { useAddReactionsMutation } from "../../api/apiSlice";

// Emojis from https://getemoji.com/
const reactionEmojis = {
	thumbsUp:'👍',
	raisingHands:'🙌',
	heart:'💛',
	rocket:'🚀',
	eyes:'👀'
};

// Component
const ReactionButtons = ({ post }) => {

	// RTK Query
	const [addReaction] = useAddReactionsMutation();

	// Return
	return(
		<div>
			{
				Object.entries(reactionEmojis).map(([name, emoji]) => {
					// console.log(name); => thumbsUp ... Get the value with post.reactions[name] ;-)
					// console.log(emoji); => 👍
					return(
						<button key={ name } type="button" className="muted-button reaction-button" 
							onClick={ () => { addReaction({ postId:post.id, reaction:name }) } }>
							{ emoji } { post.reactions[name] }
						</button>
					);
				})
			}
		</div>
	);

};

// Export
export default ReactionButtons;