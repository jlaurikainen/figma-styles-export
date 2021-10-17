figma.showUI(__html__, {height: 600, width: 1200});

figma.ui.onmessage = (msg) => {
  switch (msg.type) {
    case "log-colors":
      const styles = figma.getLocalTextStyles();

      const weightFrom = (style: string) => {
        switch (style.toLowerCase()) {
          case "medium":
          case "semibold":
            return "600";
          case "bold":
            return "700";
          default:
            return "400";
        }
      };

      const lineHeightFrom = (height: LineHeight) => {
        if (height.unit === "PIXELS") {
          return `${height.value}px`;
        }

        if (height.unit === "PERCENT") {
          return `${(height.value / 100).toFixed(2)}`;
        }

        return `${1.5}`;
      };

      const fontStyles = {};

      styles
        .sort((a, b) => (a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1))
        .forEach((fontStyle) => {
          const {fontName, fontSize, lineHeight, name} = fontStyle;
          const {family, style} = fontName;

          fontStyles[name] = `${weightFrom(
            style
          )} ${fontSize}px/${lineHeightFrom(
            lineHeight
          )} '${family}', Arial, sans-serif`;
        });

      figma.ui.postMessage(fontStyles);
      break;
    case "cancel":
      figma.closePlugin();
      break;
    default:
      break;
  }
};
