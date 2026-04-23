import { Notice, Platform } from "obsidian";

export async function pickDirectory(
  currentDirectory: string
): Promise<string | null> {
  if (!Platform.isDesktopApp) {
    new Notice("Directory picking is only available in the desktop app.");
    return null;
  }

  const electron = (window as Window & {
    require?: (moduleName: string) => unknown;
  }).require?.("electron") as
    | {
        remote?: {
          dialog?: {
            showOpenDialog: (options: {
              defaultPath?: string;
              properties: string[];
            }) => Promise<{
              canceled: boolean;
              filePaths: string[];
            }>;
          };
        };
      }
    | undefined;

  const dialog = electron?.remote?.dialog;
  if (!dialog) {
    new Notice("Unable to open the desktop directory picker.");
    return null;
  }

  const result = await dialog.showOpenDialog({
    defaultPath: currentDirectory || undefined,
    properties: ["openDirectory", "createDirectory"],
  });

  if (result.canceled || result.filePaths.length === 0) {
    return null;
  }

  return result.filePaths[0];
}
