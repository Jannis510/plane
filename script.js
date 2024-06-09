window.onload = function() {
    const plane = document.getElementById('plane');
    const gift = document.getElementById('gift');
    const bouquet = document.getElementById('bouquet');

    // Flugzeug bewegen
    plane.style.transform = 'translateX(120vw)'; // Bewegt das Flugzeug weit genug nach rechts

    // Geschenk erscheinen lassen und fallen lassen
    setTimeout(function() {
        gift.style.display = 'block';
        gift.style.left = '50%';
        gift.style.transform = 'translateX(-50%)';

        // Fügen Sie eine kleine Verzögerung hinzu, um sicherzustellen, dass das Geschenk angezeigt wird, bevor die Animation beginnt
        setTimeout(function() {
            gift.style.transition = 'top 2s linear';
            gift.style.top = '70vh'; // Position am unteren Rand des Himmelsbereichs
        }, 50);
    }, 2500);

    // Geschenk anklicken, um es in einen Blumenstrauß zu verwandeln
    gift.addEventListener('click', function() {
        // Geschenk "öffnen" Animation
        gift.style.transform = 'translateX(-50%) scale(1.2)';
        gift.style.opacity = '0';

        // Herz-Effekte hinzufügen
        for (let i = 0; i < 30; i++) {
            const heart = document.createElement('div');
            heart.classList.add('heart');
            heart.style.left = '50%';
            heart.style.top = '70vh';
            heart.style.setProperty('--x', (Math.random() - 0.5) * 2000); // Zufällige X-Richtung
            heart.style.setProperty('--y', (Math.random() - 0.5) * 2000); // Zufällige Y-Richtung
            document.body.appendChild(heart);
            setTimeout(() => {
                heart.remove();
            }, 4000); // Entferne die Herzen nach 4 Sekunden (Dauer der Animation)
        }

        // Nach einer kurzen Verzögerung die Blumen anzeigen
        setTimeout(function() {
            bouquet.style.display = 'block';
            bouquet.style.transform = 'translateX(-50%) scale(1)';
            bouquet.style.opacity = '1';
        }, 500);
    });
}
