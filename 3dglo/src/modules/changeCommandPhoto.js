const changeCommandPhoto = () => {
    const command = document.getElementById('command'),
          commandPhoto = command.querySelectorAll('.command__photo');
    
    let dataImgs = [];

    commandPhoto.forEach((img) => {
        dataImgs.push(img.src);
    });
    
    command.addEventListener('mouseover', (evt) => {
        if(evt.target.matches('.command__photo')) {
            evt.target.src = evt.target.dataset.img;
        }
    });

    command.addEventListener('mouseout', (evt) => {
        if(evt.target.matches('.command__photo')) {
            commandPhoto.forEach((img, i) => {
                if (img == evt.target) {
                    evt.target.src = dataImgs[i];
                }
            });
        }
    });
};

export default changeCommandPhoto;