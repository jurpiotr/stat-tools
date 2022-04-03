export class Watchlist {
   constructor(){
      this.currentList = JSON.parse(localStorage.getItem('watchlist')) || [];
   }
   createItem = (id, image, name ) => {
      const item = {
         id: id,
         image: image,
         name: name
      }
      return item;
   }
   getStorage = () => {
      const storage = JSON.parse(localStorage.getItem('watchlist')) || [];
      return storage;
   }
   add = (obj) => {
      obj ? this.currentList.push(obj) : '';
      console.log(this.currentList)
      localStorage.setItem('watchlist', JSON.stringify(this.currentList));
   }
   delete = (e) => {
      this.currentList.forEach((item, index, object) => {
         // Deleting the film from Watchlist
         if(item.id === Number(e.target.id)){
            console.log(e.target.id)
            object.splice(index, 1);
            this.add();
            return;
         }
      })
   }
   contains = (id, text) => {
      let show = '';
      this.currentList.forEach((item, index, object) => {
         if(item.id === Number(id)){
            show = text;
         }
      });
      return show;
   }
}
