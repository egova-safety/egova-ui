import { component, config, watch, Component } from "../decorator";
import "./image-magnifier.less";

@component({
    template: require("./image-magnifier.html"),
    components: {

    }
})
export default class MagnifyingGlass extends Component {
    @config({ default: "" })
    public imgUrl: string;
    @config({ default: 0 })
    public index: number;
    // 放大镜宽度
    @config({ default: 200 })
    public glassWidth: number;
    @config({ default: 200 })
    public glassHeight: number;
    // 算法识别区域
    @config({ default: () => [0, 0, 0, 0] })
    public area: Array<number>;
    // 是否可以加载画布，如果是弹窗的话 如果父元素没有显示出来的时候，不能加载画布 否则画布的宽高为0
    @config({ default: false })
    public load: boolean;
    @watch("load", { immediate: false })
    public changeLoad(nv: boolean, ov: boolean) {
        if (nv) { this.draw(); }
    }
    @watch("imgUrl", { immediate: false })
    public changeImg(nv: string, ov: string) {
        if (this.load) { this.draw(); }
    }
    public drawArea(originalWidth: number, originalHeight: number) {
        let width = 0, height = 0, left = 0, top = 0;
        [left, top, width, height] = this.area;
        left = left / originalWidth;
        top = top / originalHeight;
        width = width / originalWidth;
        height = height / originalHeight;
        // this.areaStyle = `width:${width}%;height:${height}%;top:${top}%;left:${left}%`;
        let canvas = document.getElementById("imgcan" + this.index) as HTMLCanvasElement;
        let ctx = canvas.getContext("2d");
        // 根据父元素的宽高设置canvas宽高
        let p = document.getElementById("magnifying-glass" + this.index) as HTMLElement;
        left = p.offsetWidth * left;
        top = p.offsetHeight * top;
        width = p.offsetWidth * width;
        height = p.offsetHeight * height;
        ctx.fillStyle = "rgba(0,0,0,0)";
        ctx.strokeStyle = "#ff0000";
        ctx.lineWidth = 1;
        ctx.rect(left, top, width, height);
        ctx.fill();
        ctx.stroke();
    }

    public draw() {
        let imgcan = document.getElementById("imgcan" + this.index) as HTMLCanvasElement,
            glasscan = document.getElementById("glasscan" + this.index) as HTMLCanvasElement,
            imgContext = imgcan.getContext("2d"),
            glassContext = glasscan.getContext("2d"),
            img = new Image();
        // 根据父元素的宽高设置canvas宽高
        let p = document.getElementById("magnifying-glass" + this.index) as HTMLElement;
        let width = p.offsetWidth;
        let height = p.offsetHeight;
        // 图片原始宽高
        let originalWidth = 0, originalHeight = 0;
        imgcan.width = width;
        imgcan.height = height;
        let mouse = this.captureMouse(imgcan);
        img.src = this.imgUrl;
        img.onload = () => {
            // 因为图片显示时一般都被缩放 这里获取图片的原始尺寸,只有图片加载完成naturalWidth才有值，否则为0
            // 所以需要用到naturalWidth的语句需要方法这里面执行
            originalWidth = img.naturalWidth;
            originalHeight = img.naturalHeight;
            imgContext.drawImage(img, 0, 0, width, height);
            this.drawArea(originalWidth, originalHeight);
            // 给画布绑定鼠标移动事件
            imgcan.onmousemove = () => {
                glassContext.clearRect(0, 0, glasscan.width, glasscan.height);
                glasscan.style.left = mouse.x + "px";
                glasscan.style.top = mouse.y + "px";
                glasscan.style.display = "block";
                let drawWidth = this.glassWidth / 2,
                    drawHeight = this.glassHeight / 2;
                // 这里获取放大部位时设置坐标要考虑图片的缩放
                glassContext.drawImage(img, mouse.x * (originalWidth / width) - drawWidth / 2, mouse.y * (originalHeight / height) - drawHeight / 2, drawWidth, drawHeight, 0, 0, this.glassWidth, this.glassHeight);     //  实现放大镜
            };
            // 绑定鼠标移出事件
            imgcan.onmouseout = (event: Event) => {
                glasscan.style.display = "none";
            };
        };
    }
    // 获取图片元素内鼠标位置
    public captureMouse(element: any) {
        let mouse = { x: 0, y: 0 };
        element.addEventListener("mousemove", (event: any) => {
            let x, y;
            if (event.pageX || event.pageY) {
                x = event.pageX;
                y = event.pageY;
            } else {
                x = event.clientX + (document.body.scrollLeft ||
                    document.documentElement.scrollLeft);
                y = event.clientY + (document.body.scrollTop ||
                    document.documentElement.scrollTop);
            }
            // 迭代减去所有父元素到左边和上边的距离，从而使得x.y为鼠标到图片左边和上边的距离
            let target = event.currentTarget;
            while (target) {
                x -= target.offsetLeft;
                y -= target.offsetTop;
                target = target.offsetParent;
            }
            mouse.x = x;
            mouse.y = y;
        }, false);
        return mouse;
    }
}
