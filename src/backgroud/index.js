import './styles.css';

function noise2(t, seed){
    return Math.sin(t * 0.9 + seed) * 0.6
        + Math.sin(t * 2.3 + seed * 1.7) * 0.3
        + Math.sin(t * 5.1 + seed * 3.1) * 0.1;
}

class SmokeParticle{
    constructor(w, h){ this.reset(w, h, true); }
    reset(w, h, initial){
        this.seed = Math.random() * 1000;
        this.x = Math.random() * w;
        this.y = initial ? h * (0.5 + Math.random() * 0.6) : h + 60;
        this.radius = 50 + Math.random() * 110;
        this.baseSpeed = 0.12 + Math.random() * 0.22;
        this.driftAmp = 8 + Math.random() * 18;
        this.maxLife = 900 + Math.random() * 700;
        this.life = initial ? Math.random() * this.maxLife : 0;
        this.warmth = Math.random();
    }
    update(w, h, t){
        this.life++;
        this.y -= this.baseSpeed;
        this.x += noise2(t * 0.01, this.seed) * (this.driftAmp * 0.02);
        if (this.life > this.maxLife || this.y < -this.radius){
            this.reset(w, h, false);
        }
    }
    alpha(){
        const lifeRatio = this.life / this.maxLife;
        let a;
        if (lifeRatio < 0.15) a = lifeRatio / 0.15;
        else if (lifeRatio > 0.75) a = (1 - lifeRatio) / 0.25;
        else a = 1;
        return Math.max(0, Math.min(1, a)) * 0.16;
    }
    draw(ctx){
        const a = this.alpha();
        if (a <= 0.002) return;
        const g = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.radius);
        const warm = this.warmth > 0.85;
        const rgb = warm ? '90, 68, 50' : '54, 50, 46';
        g.addColorStop(0, `rgba(${rgb}, ${a})`);
        g.addColorStop(0.5, `rgba(${rgb}, ${a * 0.55})`);
        g.addColorStop(1, `rgba(${rgb}, 0)`);
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
    }
}

class GlowLight{
    constructor(type, w, h){
        this.type = type;
        this.w = w; this.h = h;
        this.seed = Math.random() * 1000;
        this.spawnTime = 0;

        if (type === 'ember'){
            this.x = w * (0.15 + Math.random() * 0.7);
            this.y = h * (0.92 + Math.random() * 0.06);
            this.baseRadius = 140 + Math.random() * 90;
            this.color = [255, 108, 40];
            this.baseAlpha = 0.35;
        } else if (type === 'lantern'){
            this.x = w * (0.2 + Math.random() * 0.6);
            this.y = h * (0.25 + Math.random() * 0.3);
            this.baseRadius = 55 + Math.random() * 25;
            this.color = [255, 201, 107];
            this.baseAlpha = 0.4;
            this.swingAmp = 12 + Math.random() * 14;
        } else {
            this.x = Math.random() * w;
            this.y = h * (0.3 + Math.random() * 0.5);
            this.baseRadius = 100 + Math.random() * 60;
            this.color = [255, 236, 190];
            this.life = 0;
            this.maxLife = 18 + Math.random() * 14;
        }
    }
    update(t){
        if (this.type === 'lantern'){
            this.dx = Math.sin(t * 0.0016 + this.seed) * this.swingAmp;
            this.dy = Math.sin(t * 0.0031 + this.seed) * (this.swingAmp * 0.25);
        }
        if (this.type === 'spark') this.life++;
    }
    alphaNow(t){
        if (this.type === 'ember'){
            const flicker = noise2(t * 0.02, this.seed) * 0.5 + 0.5;
            return this.baseAlpha * (0.55 + flicker * 0.6);
        }
        if (this.type === 'lantern'){
            const flicker = noise2(t * 0.04, this.seed + 50) * 0.5 + 0.5;
            return this.baseAlpha * (0.5 + flicker * 0.7);
        }
        const r = this.life / this.maxLife;
        return Math.max(0, (1 - r) ** 2) * 0.85;
    }
    dead(){ return this.type === 'spark' && this.life > this.maxLife; }
    draw(ctx, t){
        const a = this.alphaNow(t);
        if (a <= 0.01) return;
        const x = this.x + (this.dx || 0);
        const y = this.y + (this.dy || 0);
        const r = this.baseRadius * (this.type === 'spark' ? (0.6 + this.life / this.maxLife) : 1);
        const [R,G,B] = this.color;
        const g = ctx.createRadialGradient(x, y, 0, x, y, r);
        g.addColorStop(0,   `rgba(${R},${G},${B}, ${a})`);
        g.addColorStop(0.3, `rgba(${R},${G},${B}, ${a * 0.5})`);
        g.addColorStop(1,   `rgba(${R},${G},${B}, 0)`);
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.fill();
    }
}

function init(containerId, opts = {}){
    const container = document.getElementById(containerId);
    if (!container) throw new Error(`PirateShipBackground: conteneur #${containerId} introuvable`);

    const smokeCanvas = container.querySelector('#smoke-canvas') || document.createElement('canvas');
    const lightCanvas = container.querySelector('#light-canvas') || document.createElement('canvas');
    const sctx = smokeCanvas.getContext('2d');
    const lctx = lightCanvas.getContext('2d');

    smokeCanvas.style.mixBlendMode = 'screen';
    smokeCanvas.style.zIndex = '2';
    lightCanvas.style.mixBlendMode = 'screen';
    lightCanvas.style.zIndex = '3';

    let W, H, dpr;
    function resize(){
        dpr = Math.min(window.devicePixelRatio || 1, 2);
        W = container.clientWidth;
        H = container.clientHeight;
        [smokeCanvas, lightCanvas].forEach(c => {
            c.width = W * dpr;
            c.height = H * dpr;
        });
        sctx.setTransform(dpr,0,0,dpr,0,0);
        lctx.setTransform(dpr,0,0,dpr,0,0);
    }
    resize();
    window.addEventListener('resize', resize);

    const particleCount = opts.particleCount ?? 46;
    const particles = Array.from({length: particleCount}, () => new SmokeParticle(W, H));

    const lights = [
        new GlowLight('ember', W, H),
        new GlowLight('ember', W, H),
        new GlowLight('lantern', W, H),
    ];
    const maxSparks = 2;

    let running = true;
    let rafId = null;

    function frame(t){
        if (!running) return;

        sctx.clearRect(0, 0, W, H);
        particles.forEach(p => { p.update(W, H, t); p.draw(sctx); });

        lctx.clearRect(0, 0, W, H);
        lctx.globalCompositeOperation = 'lighter';
        const sparkCount = lights.filter(l => l.type === 'spark').length;
        if (sparkCount < maxSparks && Math.random() < 0.004){
            lights.push(new GlowLight('spark', W, H));
        }
        for (let i = lights.length - 1; i >= 0; i--){
            const l = lights[i];
            l.update(t);
            l.draw(lctx, t);
            if (l.dead()) lights.splice(i, 1);
        }
        lctx.globalCompositeOperation = 'source-over';

        rafId = requestAnimationFrame(frame);
    }
    rafId = requestAnimationFrame(frame);

    return {
        destroy(){
            running = false;
            if (rafId) cancelAnimationFrame(rafId);
            window.removeEventListener('resize', resize);
        },
        pause(){ running = false; if (rafId) cancelAnimationFrame(rafId); },
        resume(){ if (!running){ running = true; rafId = requestAnimationFrame(frame); } }
    };
}

export { init as initBackground };
