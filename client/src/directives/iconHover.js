const HOVER_COLOR = '#009ef7';

export const IconHoverDirective = {
    bind(el) {
        el.onmouseover = () => el.firstChild.firstChild.style.fill = HOVER_COLOR;

        el.onmouseleave = () => el.firstChild.firstChild.style.fill = '';
    }
};