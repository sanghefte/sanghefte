/**
 * @jest-environment node
 */
import {
  checkIfPamphletExist,
  createSanghefte,
  createSong,
  deleteSanghefte,
  deleteSong,
  getAllSongs,
} from "../util/firestoreFunctions";

test("Create and read a song-pamphlet with a song", async () => {
  await createSanghefte("testHefte");
  await createSong("testHefte", "title", "text", "creator");
  const data = await getAllSongs("testHefte");
  await expect(data[0].title).toBe("title");
  await expect(data[0].text).toBe("text");
  await expect(data[0].creator).toBe("creator");
});

test("Update songpamphlet", async () => {
  await createSong("testHefte", "title", "newText", "newCreator");
  const newData = await getAllSongs("testHefte");
  await expect(newData[0].text).toBe("newText");
  await expect(newData[0].creator).toBe("newCreator");
});

test("Delete song", async () => {
  await deleteSong("testHefte", "title");
  const dataAfterDelete = await getAllSongs("testHefte");
  await expect(dataAfterDelete.length).toBe(0);
});

test("Delete song-pamphlet", async () => {
  await deleteSanghefte("testHefte");
  const isDeleted = await checkIfPamphletExist("testHefte");
  expect(isDeleted).toBe(false);
});
