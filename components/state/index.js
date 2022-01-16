import {types, onSnapshot} from 'mobx-state-tree';
import React from 'react';
import {groupBy} from 'lodash';

// export const ExpenseArray = types.model('ExpenseArray', {
//     id: types.optional(types.string),
//     value: types.number,
//     date: types.string,
//     type: types.string,
//     description: types.string,
//     way: types.string,
// });

// export const Note = types.model('Note', {
//     id: types.optional(types.string),
//     note: types.string,
//     date: types.string,
// });
// //  mobx-state-tree model for handling Expenses Related Operations
// export const ExpenseStore = types
//     .model('Store', {
//         expenses: types.optional(types.array(ExpenseArray), []),
//     })
//     .views(self => ({
//         get Expenses() {
//             return self.expenses;
//         },
//         get DebitExpenses() {
//             return self.expenses.filter(expense => expense.type === 'Debit');
//         },
//         get CreditExpenses() {
//             return self.expenses.filter(expense => expense.type === 'Credit');
//         },
//     }))
//     .actions(self => ({
//         addExpense(expense) {
//             self.expenses.push(expense);
//         },
//     }));

// // mobx-state-tree store for handling notes
// export const NoteStore = types
//     .model('NoteStore', {
//         notes: types.optional(types.array(Note), []),
//     })
//     .views(self => ({
//         get Notes() {
//             return self.notes;
//         },
//     }))
//     .actions(self => ({
//         addNote(note) {
//             self.notes.push(note);
//         },
//     }));

const SnackBar = types
    .model('SnackBar', {
        open: types.boolean,
        text: types.string,
    })
    .views(self => ({
        get isOpen() {
            return self.open;
        },
    }))
    .actions(self => ({
        openSnackBar(message) {
            self.open = true;
            self.text = message;
        },
        closeSnackBar() {
            self.open = false;
        },
    }));

export const snackbar = SnackBar.create({open: false, text: ''});

export default SnackBar;
