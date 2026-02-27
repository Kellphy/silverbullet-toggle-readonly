import { editor, system } from "@silverbulletmd/silverbullet/syscalls";

export async function toggleReadOnly() {
  const forcedROMode = await editor.getUiOption("forcedROMode");

  editor.flashNotification(
    `Switching to ${forcedROMode ? "Edit" : "Read-Only"} Mode`,
  );

  await editor.setUiOption("forcedROMode", !forcedROMode);

  setTimeout(async () => {
    await editor.rebuildEditorState();
  });
}

export async function enableReadOnlyOnInit() {
  await editor.setUiOption("forcedROMode", true);
}
