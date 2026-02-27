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
  }, 200);
}

export async function enableReadOnlyOnInit() {
  await editor.setUiOption("forcedROMode", true);
}
