import colors from "../../assets/styles/variables/_colors.module.scss";

const icon = ({
  iconFunc = () => {},
  lightness = "main" | "light" | "dark" | "contrastText",
}) => {
  const main = colors["main-color-1"];
  const light = colors["main-color-1-light"];
  const dark = colors["main-color-1-dark"];
  const contrastText = colors["main-color-1-contrast"];

  const getColor = (color) => {
    switch (color) {
      case "main":
        return main;
      case "dark":
        return dark;
      case "light":
        return light;
      case "contrastText":
        return contrastText;
      default:
        return main;
    }
  };

  return iconFunc(getColor(lightness));
};

export default icon;
