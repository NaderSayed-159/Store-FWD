// import { UsersModel } from "../usersModel";

// const user1 = new UsersModel;


// describe('Books Model', () => {
//     it('should have index', () => {
//         expect(user1.index).toBeDefined();
//     })
//     it('should have show', () => {
//         expect(user1.show).toBeDefined();
//     })
//     it('should have create', () => {
//         expect(user1.create).toBeDefined();
//     })
//     it('should have delete', () => {
//         expect(user1.delete).toBeDefined();
//     })
//     it('index Method return array', async () => {
//         const res = await user1.index();
//         expect(res).toEqual([]);
//     })

//     it('Create method should add  a book', async () => {
//         const res = await user1.create({
//             title: '100$',
//             author: 'nader',
//             pages: 100,
//             type: 'investment',
//             summary: 'nothing useful'
//         })
//         expect(res).toEqual({
//             id: 1,
//             title: '100$',
//             author: 'nader',
//             pages: 100,
//             type: 'investment',
//             summary: 'nothing useful'
//         })
//     })


// })