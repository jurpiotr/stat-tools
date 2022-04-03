

export class Table {
   constructor(watchlist){
      this.watchlist = watchlist;
      this.isStart = false;
      this.scrollY;
      this.startMouseY;
      this.diffPositionTabs;
      this.activeTab;
      this.siblingTab;
      [...this.tabs] = document.getElementsByClassName('table__row');
   }
   renderTable = (STContainer) => {
      const storageWatchlist = this.watchlist.getStorage();

      const tableHTML = document.createElement('div');
      tableHTML.setAttribute('id', 'tableElem');
      tableHTML.classList.add('table')
      storageWatchlist.map((item, index) => {
         tableHTML.innerHTML +=`
            <div id="${item.id}" class="table__row">
               <div class="table__lp">${index+1}</div>
               <img class="table__img" src="${item.image}" alt="${item.name}" draggable="false">
               <div class="table__title">${item.name}</div>
               <div class="table__deleter">❌</div>
            </div>
         `});
      STContainer.innerHTML = '';
      STContainer.appendChild(tableHTML);
      return STContainer;
   }

   show = (STContainer) => {
      this.renderTable(STContainer);
   }
   deleteRow = (e,STContainer) => {
      this.watchlist.delete(e);
      this.renderTable(STContainer)
   }
   start = (e) => {
      this.isStart = true;
      this.activeTab = e;
      this.startMouseY = window.event.pageY;
      e.classList.add('table__row--active');
  }

   getPosition = () => {
      return this.activeTab.offsetTop - this.scrollY;
   }
   
   setTranslateY = () => {
      if(!this.siblingTab){return}
      const parabola = Math.sqrt(this.diffPositionTabs/2 - Math.abs(this.diffPositionTabs - (this.diffPositionTabs/2 + Math.abs(this.scrollY))))/200
      this.siblingTab.style.transform = `translateY(${this.scrollY}px) scale(${1- parabola}`;
      this.activeTab.style.transform = `translateY(${-this.scrollY}px) scale(${1+ parabola})`;
  }

   alignTab = () => {
      // function that aligns the tabs position in the Table 
      [
       this.activeTab?.nextElementSibling, 
       this.activeTab?.nextElementSibling?.nextElementSibling,
       this.activeTab?.previousElementSibling,
       this.activeTab?.previousElementSibling?.previousElementSibling].forEach((t) => {
         this.resetStyles(t);
      });
   }

   transformTab = () => {  
      this.scrollY <= 0 ? 
         this.activeTab.parentElement.insertBefore(this.siblingTab,this.activeTab):
         this.activeTab.parentElement.insertBefore(this.activeTab,this.siblingTab);
      
      this.alignTab();
      this.startMouseY = window.event.pageY;
   }

   resetStyles = (tab) => {
      tab?.classList.remove('table__row--active');
      tab?.removeAttribute('style');
      this.activeTab.removeAttribute('style');
   }
   move = () => {
      this.siblingTab = this.scrollY <= 0 ? this.activeTab?.nextElementSibling : this.activeTab?.previousElementSibling;
      
      if(!this.isStart &&
         !this.activeTab?.classList.contains('table__row--active') &&
         !this.siblingTab){ return }

      this.scrollY = this.startMouseY - window.event.pageY;
      this.diffPositionTabs = Math.abs(this.siblingTab?.offsetTop - this.activeTab.offsetTop);
      this.alignTab();
      this.setTranslateY();

      if(this.activeTab.nextElementSibling?.offsetTop <= this.getPosition() ||
         this.activeTab.previousElementSibling?.offsetTop > this.getPosition()
      ){
         this.transformTab();
         this.startMouseY = window.event.pageY;
      }

   }
   end = (e) => {
      this.diffPositionTabs/2 < Math.abs(this.scrollY) ? this.transformTab() : this.resetStyles(this.siblingTab);

      e.classList.remove('table__row--active');
      this.activeTab = undefined;
      this.isStart = false;      
     }
}
