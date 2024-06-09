window.onload = function() {
    const plane = document.getElementById('plane');
    const gift = document.getElementById('gift');
    const bouquet = document.getElementById('bouquet');

    // Soundeffekte laden
    const planeSound = new Audio('res/plane.mp3');
    const giftFallSound = new Audio('res/gift_fall.wav');
    const magicSound = new Audio('res/magic.mp3');
    const sparkleSound = new Audio('res/sparkle.mp3');

    planeSound.oncanplaythrough = () => console.log('planeSound ready to play');
    giftFallSound.oncanplaythrough = () => console.log('giftFallSound ready to play');
    magicSound.oncanplaythrough = () => console.log('magicSound ready to play');
    sparkleSound.oncanplaythrough = () => console.log('sparkleSound ready to play');

    planeSound.onerror = () => console.error('Error loading planeSound');
    giftFallSound.onerror = () => console.error('Error loading giftFallSound');
    magicSound.onerror = () => console.error('Error loading magicSound');
    sparkleSound.onerror = () => console.error('Error loading sparkleSound');

    // Funktion, um die Animation zu starten und Sound abzuspielen
    function startAnimation() {
        // Flugzeug bewegen und Sound abspielen
        planeSound.play();
        plane.style.transform = 'translateX(120vw)';

        // Geschenk erscheinen lassen und fallen lassen
        setTimeout(function() {
            gift.style.display = 'block';
            gift.style.left = '50%';
            gift.style.transform = 'translateX(-50%)';

            // Geschenk fallen lassen
            setTimeout(function() {
                gift.style.transition = 'top 2s linear';
                gift.style.top = '80vh'; // Tiefer fallen lassen

                // Eventlistener hinzufügen, um den Sound abzuspielen, wenn die Animation endet
                gift.addEventListener('transitionend', function() {
                    if (gift.style.top === '80vh') {
                        giftFallSound.play();
                    }
                }, { once: true });
            }, 50);
        }, 2500);

        // Funktion, um Kondensstreifen-Herzen zu erzeugen
        function createHeartTrail() {
            const planeRect = plane.getBoundingClientRect();
            const planeTop = planeRect.top + window.scrollY + planeRect.height * 0.45; // Position knapp unterhalb des Flugzeugs
            const planeLeft = planeRect.left + window.scrollX + planeRect.width / 2;

            const heart = document.createElement('div');
            heart.classList.add('heart');
            heart.style.left = `${planeLeft}px`;
            heart.style.top = `${planeTop}px`;
            heart.style.setProperty('--x', (Math.random() - 0.5) * 100); // Leichte zufällige X-Richtung
            heart.style.setProperty('--y', (Math.random() - 0.5) * 100); // Leichte zufällige Y-Richtung
            document.body.appendChild(heart);
            setTimeout(() => {
                heart.remove();
            }, 6000); // Dauer der Animation verlängert auf 6 Sekunden
        }

        // Kondensstreifen-Herzen in Intervallen erzeugen
        setInterval(createHeartTrail, 200);

        // Geschenk anklicken, um es in einen Blumenstrauß zu verwandeln
        gift.addEventListener('click', function() {
            // Geschenk "öffnen" Animation und Sound
            gift.style.transform = 'translateX(-50%) scale(1.2)';
            gift.style.opacity = '0';
            magicSound.play();

            // Blumenstrauß anzeigen und wachsen lassen
            bouquet.style.display = 'block';
            bouquet.style.transform = 'translateX(-50%) scale(1)';
            bouquet.style.opacity = '1';

            // Herz- und Funken-Effekte hinzufügen und Sound abspielen
            setTimeout(function() {
                const bouquetRect = bouquet.getBoundingClientRect();
                const bouquetTop = bouquetRect.top + window.scrollY + 50; // Versatz hinzugefügt, um die Effekte tiefer zu starten
                const bouquetLeft = bouquetRect.left + window.scrollX + bouquetRect.width / 2;

                // Herz-Effekte hinzufügen
                for (let i = 0; i < 30; i++) {
                    const heart = document.createElement('div');
                    heart.classList.add('heart');
                    heart.style.left = `${bouquetLeft}px`;
                    heart.style.top = `${bouquetTop}px`;
                    heart.style.setProperty('--x', (Math.random() - 0.5) * 2000); // Zufällige X-Richtung
                    heart.style.setProperty('--y', (Math.random() - 0.5) * 2000); // Zufällige Y-Richtung
                    document.body.appendChild(heart);
                    setTimeout(() => {
                        heart.remove();
                    }, 4000);
                }

                // Funken-Effekte hinzufügen
                for (let i = 0; i < 20; i++) {
                    const sparkle = document.createElement('div');
                    sparkle.classList.add('sparkle');
                    sparkle.style.left = `${bouquetLeft}px`;
                    sparkle.style.top = `${bouquetTop}px`;
                    sparkle.style.setProperty('--x', (Math.random() - 0.5) * 1000); // Zufällige X-Richtung
                    sparkle.style.setProperty('--y', (Math.random() - 0.5) * 1000); // Zufällige Y-Richtung
                    document.body.appendChild(sparkle);
                    setTimeout(() => {
                        sparkle.remove();
                    }, 1000);
                }

                sparkleSound.play();
            }, 500); // Verzögerung, um sicherzustellen, dass der Blumenstrauß zuerst erscheint
        });
    }

    // Warten auf Benutzereingabe, um die Animation zu starten
    document.body.addEventListener('click', startAnimation, { once: true });
}