import { IScene, UserType } from "~~/services/store/store";

export const scene1: IScene[] = [
  {
    id: "scene1",
    from: "system",
    options: [
      {
        text: "You enter the cafe and see Alex waving from a corner table near the window.",
        to: "scene2",
      },
    ],
  },
  {
    id: "scene2",
    from: "user1",
    options: [
      {
        text: "Smile and walk over to Alex.",
        to: "scene3",
      },
      {
        text: "Wave back but stop to order a coffee first.",
        to: "scene4",
      },
    ],
  },
  {
    id: "scene3",
    from: "user2",
    options: [
      {
        text: "'Hey! It's great to see you. How's your day going?'",
        to: "scene5",
      },
      {
        text: "'You found the place okay? This weather is crazy, right?'",
        to: "scene6",
      },
    ],
  },
  {
    id: "scene4",
    from: "user2",
    options: [
      {
        text: "'Getting coffee first? Good idea, what are you getting?'",
        to: "scene5",
      },
      {
        text: "'I already grabbed us a spot. I'll wait here while you order.'",
        to: "scene6",
      },
    ],
  },
  {
    id: "scene5",
    from: "user1",
    options: [
      {
        text: "Tell Alex about your day and ask about his.",
        to: "scene7",
      },
      {
        text: "Comment on the coffee selection and suggest trying something new together.",
        to: "scene8",
      },
    ],
  },
  {
    id: "scene6",
    from: "user1",
    options: [
      {
        text: "Laugh and agree about the weather, then join Alex at the table.",
        to: "scene7",
      },
      {
        text: "Nod and quickly order your usual before joining Alex.",
        to: "scene8",
      },
    ],
  },
  {
    id: "scene7",
    from: "system",
    options: [
      {
        text: "As you both talk, the conversation flows easily and time seems to fly by.",
        to: null, // Ending scene or transition to another phase
      },
    ],
  },
  {
    id: "scene8",
    from: "system",
    options: [
      {
        text: "Trying a new coffee blend, you both enjoy the rich flavors, setting a pleasant tone for a deep conversation.",
        to: null, // Ending scene or transition to another phase
      },
    ],
  },
];

export const getScenes = (userType: UserType): IScene[] => {
  return scene1.map((s) => {
    if (s.from === userType || s.from === "system") {
      return s;
    } else {
      return {
        ...s,
        options: [],
      };
    }
  });
};

