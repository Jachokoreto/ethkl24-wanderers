import React from "react";
import { Card } from "./Card";

const story =
  'In the quaint downtown cafe, lined with books and the soft hum of indie music, Ellie bumped into Alex, her old high school crush, purely by chance. The surprise was evident on both faces.\n\n"Alex? Wow, this is unexpected!" Ellie\'s heart raced as she balanced her tray.\n\n"Ellie, right? I can\'t believe it\'s been so long!" Alex smiled, looking genuinely pleased. They found a table near the window, the rain outside casting a cozy glow inside.\n\nAs they sipped their lattes, the conversation flowed easily, touching on past memories and current dreams. The spark between them was undeniable.\n\n"Listen, I know this is sudden, but would you like to go out sometime? Maybe dinner?" Alex asked, hopeful.\n\nEllie\'s smile said it all. "I\'d love to, Alex. It\'s like something out of a storybook, meeting like this."\n\nThey exchanged numbers, the promise of a new beginning just a phone call away, leaving the cafe with more warmth in their hearts than the coffee could ever offer.';

export const Summary = () => {
  return (
    <Card>
      <div className="bg-white/70 rounded-md p-6">
        <h3>Summary</h3>
        <p>{story}</p>
      </div>
    </Card>
  );
};
