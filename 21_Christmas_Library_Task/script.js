const uniqueId = () => {
  const dateString = Date.now().toString(36);
  const randomness = Math.random().toString(36).substr(2);
  return dateString + randomness;
};

class Book {
  constructor({ title, author, totalCopies }) {
    this.id = uniqueId();
    this.title = title;
    this.author = author;
    this.totalCopies = totalCopies;
    this.availableCopies = totalCopies;
  }

  isAvailable() {
    return this.availableCopies > 0;
  }
}

class Reader {
  constructor({ name, borrowLimit }) {
    this.id = uniqueId();
    this.name = name;
    this.borrowLimit = borrowLimit;
    this.borrowedBookIds = [];
  }

  canBorrow() {
    return this.borrowedBookIds.length < this.borrowLimit;
  }
}

class Loan {
  constructor({ bookId, readerId, loanDate }) {
    this.id = uniqueId();
    this.bookId = bookId;
    this.readerId = readerId;
    this.loanDate = loanDate;
    this.returnDate = null;
    this.status = "ACTIVE";
  }
}

class Library {
  books = [];
  readers = [];
  loans = [];

  addBook(book) {
    this.books.push(book);
  }

  registerReader(reader) {
    this.readers.push(reader);
  }

  borrowBook(readerId, bookId, date) {
    const reader = this.readers.find((r) => r.id === readerId);
    const book = this.books.find((b) => b.id === bookId);

    if (!reader || !book) {
      console.error("BORROW FAILED: reader or book not found");
      return null;
    }

    if (!book.isAvailable()) {
      console.error(
        `BORROW FAILED: ${reader.name} cannot borrow "${book.title}" (no copies available)`
      );
      return null;
    }

    if (!reader.canBorrow()) {
      console.error(`BORROW FAILED: ${reader.name} reached borrow limit`);
      return null;
    }

    book.availableCopies--;
    reader.borrowedBookIds.push(book.id);

    const loan = new Loan({ bookId, readerId, loanDate: date });
    this.loans.push(loan);

    console.log(`BORROW OK: ${reader.name} borrowed "${book.title}"`);
    return loan;
  }

  returnBook(loanId, date) {
    const loan = this.loans.find(
      (l) => l.id === loanId && l.status === "ACTIVE"
    );

    if (!loan) {
      console.error(
        `RETURN FAILED: Loan with ID "${loanId}" does not exist or is already returned`
      );
      return;
    }

    const book = this.books.find((b) => b.id === loan.bookId);
    const reader = this.readers.find((r) => r.id === loan.readerId);

    loan.status = "RETURNED";
    loan.returnDate = date;

    book.availableCopies++;
    reader.borrowedBookIds = reader.borrowedBookIds.filter(
      (id) => id !== book.id
    );

    console.log(`RETURN OK: "${book.title}" returned by ${reader.name}`);
  }

  getActiveLoans() {
    return this.loans.filter((l) => l.status === "ACTIVE");
  }

  printChristmasReport() {
    console.log("\nCHRISTMAS LIBRARY REPORT");

    this.books.forEach((book) => {
      console.log(
        `${book.title}: ${book.availableCopies} / ${book.totalCopies} available`
      );
    });

    console.log("\nACTIVE LOANS");
    this.getActiveLoans().forEach((loan) => {
      const reader = this.readers.find((r) => r.id === loan.readerId);
      const book = this.books.find((b) => b.id === loan.bookId);
      console.log(`${reader.name} → ${book.title}`);
    });
  }
}

//*************************IMPLEMENTATION*************************

const library = new Library();

const cleanCode = new Book({
  title: "Clean Code",
  author: "Robert C. Martin",
  totalCopies: 2,
});
const pragmatic = new Book({
  title: "The Pragmatic Programmer",
  author: "Hunt & Thomas",
  totalCopies: 1,
});
const refactoring = new Book({
  title: "Refactoring",
  author: "Martin Fowler",
  totalCopies: 1,
});

library.addBook(cleanCode);
library.addBook(pragmatic);
library.addBook(refactoring);

const alice = new Reader({ name: "Alice", borrowLimit: 2 });
const bob = new Reader({ name: "Bob", borrowLimit: 1 });

library.registerReader(alice);
library.registerReader(bob);

const loan1 = library.borrowBook(alice.id, cleanCode.id, new Date());
const loan2 = library.borrowBook(alice.id, cleanCode.id, new Date());
library.borrowBook(bob.id, cleanCode.id, new Date());
library.returnBook(loan1.id, new Date());

library.printChristmasReport();
