import {
  clientStore,
  editor,
} from "@silverbulletmd/silverbullet/syscalls";

const STORE_KEY = "toggleReadOnlyMode";

export async function toggleReadOnly() {
  const forcedROMode = await editor.getUiOption("forcedROMode");
  const newMode = !forcedROMode;

  await clientStore.set(STORE_KEY, newMode);
  await editor.setUiOption("forcedROMode", newMode);

  // Navigate away and back to force editor state rebuild
  // (loadPage only calls createEditorState when loading a different page)
  const currentPage = await editor.getCurrentPage();
  await editor.navigate({ page: "SETTINGS" }, true, false);
  await editor.navigate({ page: currentPage }, true, false);

  editor.flashNotification(
    `Switched to ${forcedROMode ? "Edit" : "Read-Only"} Mode`,
  );
}

export async function enableReadOnlyOnInit() {
  const savedMode = await clientStore.get(STORE_KEY);
  const shouldBeReadOnly = savedMode !== null && savedMode !== undefined
    ? savedMode
    : true;

  await editor.setUiOption("forcedROMode", shouldBeReadOnly);
}
