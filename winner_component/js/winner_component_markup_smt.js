(function (Drupal) {
  Drupal.behaviors.winnersBehavior = {
    attach: function (context, settings) {
      const winnersItems = context.querySelectorAll('.winners__item');
      let activeWinnerContent = null;

      winnersItems.forEach((item, i) => {
        if (i === 0) return;

        const winnersItem = item.querySelector('.winners__content');

        item.addEventListener('click', (event) => {
          event.stopPropagation();

          if (activeWinnerContent && activeWinnerContent !== winnersItem) {
            closeWinnersItem(activeWinnerContent);
          }

          if (!winnersItem.classList.contains('active')) {
            winnersItem.classList.add('active');
            winnersItem.style.animation = 'active-content-start 0.5s both';
            activeWinnerContent = winnersItem;
          } else {
            closeWinnersItem(winnersItem);
            activeWinnerContent = null;
          }
        });
      });

      document.addEventListener('click', () => {
        if (activeWinnerContent) {
          closeWinnersItem(activeWinnerContent);
          activeWinnerContent = null;
        }
      });

      function closeWinnersItem(winnersItem) {
        winnersItem.style.animation = 'active-content-end 0.5s both';

        setTimeout(() => {
          winnersItem.classList.remove('active');
          winnersItem.style.animation = '';
        }, 500);
      }

      function updateWinnersHeight() {
        const winnersInner = context.querySelector('.winners__inner');
        if (winnersInner) {
          winnersInner.style.height = 'auto';

          const winnersHeight = winnersInner.offsetHeight;

          winnersInner.style.height = `${winnersHeight}px`;
        }
      }

      window.addEventListener('resize', updateWinnersHeight);

      updateWinnersHeight();
    },
  };
})(Drupal);
