/**
 * This module contains utility functions.
 * @module utils
 */

/**
 * Generating classNames for the button based on the BEM modifiers.
 *
 * @param {Array} variant Array of viarant the can be used to generate classNames
 * @returns {string}
 */
export const getClassNames = (element, modifiers) =>
  modifiers.map(modifier => `${element}--${modifier}`).join(" ");

/**
 * Persisting IDs of user's books in shelves.
 * By persisting the data in localStorage, allows us to access data between the
 * pages(home and search pages), even after page reload.
 * We store data immediately after a book is moved from one shelf to another successfully.
 *
 * @param {Object} data Object of arrays for books' IDs.
 * {currentlyReading: ["jdad98d9s", "9dadadfd0d"], wantToRead: ["adaerr3q3", "33qe34fgrgrsrt"], read: []}
 *
 * @returns {void}
 */
export const persistBooksIdsFromShelves = data => {
  localStorage.setItem("idsInShelves", JSON.stringify(data));
};

/**
 * Checking if a book is listed in a particular user's shelf and update "book.shelf" property with value
 * of the shelf the ID is found in.
 * Checking is done against books' IDs stored in the localStorage. Please the function above.
 *
 * @todo There is a need to improve this function.
 * For dynamic shelves this is not the way to go. It should be modified in the futureif will be a need to be so.
 * Currently satisfies the requirement since we know shelfves IDs beforhand.
 *
 *
 * @param {Array} books Array of books
 * @returns {Array} Returns array
 */
export const checkIfBooksAreInUserShelves = (books = []) => {
  // Result in an object with arrays of books' IDs.
  // Eg {currentlyReading: ["jdad98d9s", "9dadadfd0d"], wantToRead: ["adaerr3q3", "33qe34fgrgrsrt"], read: []}
  const itemsInShelves = localStorage.getItem("idsInShelves")
    ? JSON.parse(localStorage.getItem("idsInShelves"))
    : null;

  if (Array.isArray(books)) {
    const items = books.map(book => {
      if (itemsInShelves && itemsInShelves.currentlyReading.includes(book.id)) {
        return { ...book, shelf: "currentlyReading" };
      }

      if (itemsInShelves && itemsInShelves.wantToRead.includes(book.id)) {
        return { ...book, shelf: "wantToRead" };
      }

      if (itemsInShelves && itemsInShelves.read.includes(book.id)) {
        return { ...book, shelf: "read" };
      }

      // Updating the shelf with no shelf property.
      return { ...book, shelf: "none" };
    });

    return items;
  }

  return books;
};

/**
 * Filtering books without thumbnails
 *
 * @param {Array} books
 * @returns {Array} Returns only books with thumbnails
 */
export const filterBooksWithoutThumbnail = (books = []) =>
  books.filter(book => book.imageLinks && book.imageLinks.thumbnail);
