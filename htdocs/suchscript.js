(function () {
    var dogerocket, total, address;

    function shake() {
        dogerocket.style.left = window.innerWidth * (1-(progress / target)) + Math.floor(Math.random() * 5 - 2) + 'px';
        dogerocket.style.top = window.innerHeight * (1-(progress / target)) +  Math.floor(Math.random() * 5 - 2) + 'px';
    }

    function randItem(array) {
        return array[Math.floor(Math.random() * array.length)];
    }

    function randInt(min, max) {
        return Math.floor(Math.random() * (max - min) + min);
    }

    var intensifiers = ['such', 'much', 'very', 'many', 'so'];
    var things = ['to the moon', 'rocket', 'Apollo', 'small step', 'no atmosphere', 'space race', 'cold war', 'star', 'donate', 'fire', 'accelerate', 'dogecoin', 'scrypt', 'crypto', 'anon', 'cynical ploy', 'doge', 'money', 'meme', 'space shibe', 'no engine', 'no spacesuit', '5s refresh', 'realtime', 'RPC'];
    
    function randomSpawn() {
        var text;
        if (Math.random() < 0.05) {
            text = 'wow';
        } else {
            text = randItem(intensifiers) + ' ' + randItem(things);
        }
        spawnText('dogetext', text, 3000);
        window.setTimeout(randomSpawn, 1500);
    }

    function spawnText(className, text, time) {
        var color = 'rgb(' + randInt(0, 256) + ',' + randInt(0, 256) + ',' + randInt(0, 256) + ')',
            element = document.createElement('div');
            x = (Math.random() * 80 + 10) + '%',
            y = (Math.random() * 80 + 10) + '%';
        element.className = className;
        element.style.color = color;
        element.style.left = x;
        element.style.top = y;
        element.appendChild(document.createTextNode(text));
        document.body.appendChild(element);
        window.setTimeout(function () {
            document.body.removeChild(element);
        }, time);
    }

    var progress = 0, target = 100000;

    function updateTotal () {
        total.innerHTML = '';
        total.appendChild(document.createTextNode(progress + '/' + target + 'DOGE'));
    }

    function updateAddress (n) {
        address.innerHTML = '';
        address.appendChild(document.createTextNode(n));
    }

    var seenTransactions = {}, firstCheck = true;

    function checkProgress () {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', '/api.php', true);
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    var data = JSON.parse(xhr.responseText);
                    progress = data.balance;
                    updateTotal();
                    updateAddress(data.address);
                    data.transactions.forEach(function (transaction) {
                        if (!seenTransactions.hasOwnProperty(transaction.txid)) {
                            seenTransactions[transaction.txid] = null;
                            if (!firstCheck) {
                                onprogress(transaction.amount);
                            }
                        }
                    });
                    firstCheck = false;
                }
                window.setTimeout(checkProgress, 5000);
            }
        };
        xhr.send();
    }

    function onprogress (x) {
        progress += x;
        updateTotal();
        spawnText('dogetext donationtext', 'much ' + x + 'DOGE donation many thank wow', 7000);
        if (progress > target)
            spawnText('dogetext donationtext', 'much doge hit moon many thank wow', 10000);
    }

    window.onload = function () {
        dogerocket = document.getElementById('dogerocket');
        total = document.getElementById('total');
        address = document.getElementById('address');
        window.setInterval(shake, 1000/15);
        randomSpawn();
        checkProgress();
    };
}());
