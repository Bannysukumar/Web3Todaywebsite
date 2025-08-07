import { ImagesCS } from "./assets/0a-exporter";

const { default: nextId } = require("react-id-generator");

let ConstantCS = {
  csSidebarList: [
    {
      leyId: nextId(),
      name: "Articles",
      id: "articles",
      icon: ImagesCS.trending,
      disable: false,
    },
    {
      leyId: nextId(),
      name: "Founders",
      id: "founders",
      icon: ImagesCS.founders,
      disable: true,
    },
    {
      leyId: nextId(),
      name: "WAPPs",
      id: "WAPPs",
      icon: ImagesCS.WAPPs,
      disable: false,
    },
    {
      leyId: nextId(),
      name: "Investors",
      id: "investors",
      icon: ImagesCS.investors,
      disable: false,
    },
    {
      leyId: nextId(),
      name: "Rankings",
      id: "rankings",
      icon: ImagesCS.rankings,
      disable: true,
    },
    {
      leyId: nextId(),
      name: "Regulation",
      id: "regulation",
      icon: ImagesCS.regulations,
      disable: true,
    },
    {
      leyId: nextId(),
      name: "Influencers",
      id: "influencers",
      icon: ImagesCS.influencer,
      disable: true,
    },
    {
      leyId: nextId(),
      name: "Banking",
      id: "banking",
      icon: ImagesCS.banking,
      disable: true,
    },
    {
      leyId: nextId(),
      name: "Tools",
      id: "tools",
      icon: ImagesCS.tools,
      disable: true,
    },
    {
      leyId: nextId(),
      name: "Events",
      id: "events",
      icon: ImagesCS.events,
      disable: true,
    },
  ],
};
export default ConstantCS;
