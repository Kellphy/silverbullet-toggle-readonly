import { editor, system } from "@silverbulletmd/silverbullet/syscalls";

export async function toggleReadOnly() {
  const forcedROMode = await editor.getUiOption("forcedROMode");
  const isClient = await system.getEnv() === "client";

  editor.flashNotification(
    `Switching to ${forcedROMode ? "Edit" : "Read-Only"} Mode`,
  );

  await editor.setUiOption("forcedROMode", !forcedROMode);

  setTimeout(async () => {
    if (isClient) {
      await editor.rebuildEditorState();
    }
  }, 50);
}

export async function enableReadOnlyOnLoad() {
  const isClient = await system.getEnv() === "client";

  await editor.setUiOption("forcedROMode", true);

  setTimeout(async () => {
    if (isClient) {
      await editor.rebuildEditorState();
    }
  }, 50);
}
