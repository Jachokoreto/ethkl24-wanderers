import React from "react";
import { Card } from "./Card";
import { motion } from "framer-motion";

const story =
  'In the quaint downtown cafe, lined with books and the soft hum of indie music, Ellie bumped into Alex, her old high school crush, purely by chance. The surprise was evident on both faces.\n\n"Alex? Wow, this is unexpected!" Ellie\'s heart raced as she balanced her tray.\n\n"Ellie, right? I can\'t believe it\'s been so long!" Alex smiled, looking genuinely pleased. They found a table near the window, the rain outside casting a cozy glow inside.\n\nAs they sipped their lattes, the conversation flowed easily, touching on past memories and current dreams. The spark between them was undeniable.\n\n"Listen, I know this is sudden, but would you like to go out sometime? Maybe dinner?" Alex asked, hopeful.\n\nEllie\'s smile said it all. "I\'d love to, Alex. It\'s like something out of a storybook, meeting like this."\n\nThey exchanged numbers, the promise of a new beginning just a phone call away, leaving the cafe with more warmth in their hearts than the coffee could ever offer.';

export const Summary = () => {
  return (
    <Card>
      <motion.div className="bg-white/70 rounded-md p-6" drag={"x"} dragConstraints={{ left: 0, right: 300 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.9 }}
        onDragEnd={(event, info) => {
            if (info.point.x > 200) {
                alert("Swiped right!");
            } else if (info.point.x < -200) {
                alert("Swiped left!");
            }
        }}
      >
        <h3>Summary</h3>
        <p>{story}</p>
      </motion.div>
    </Card>
  );
};
