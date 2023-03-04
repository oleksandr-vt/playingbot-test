import { gsap } from 'gsap';

export const initAnimation = ({ icon, score, title, card, animationDuration, textTheme, cardTheme, onUpdate, onComplete }) => {
    const iconTimeline = gsap.timeline()
        .to(icon, { duration: animationDuration / 1.2, y: '-200%', ease: 'Power1.out', })

    const cardTimeline = gsap.timeline()
        .to(title, { duration: animationDuration / 6, ...textTheme.active }, 0)
        .to(title, { duration: animationDuration / 4, ...textTheme.default }, animationDuration / 5)
        .to(card, { duration: animationDuration / 6, ...cardTheme.active }, 0)
        .to(card, { duration: animationDuration / 4, ...cardTheme.default }, animationDuration / 5)

    const scoreTimeline = gsap.timeline()
        .to(score, { duration: 0, ...textTheme.active, immediateRender: false })
        .to(score, { duration: animationDuration / 2.5, ...textTheme.default }, animationDuration / 3)

    const mainTimeline = gsap.timeline({ paused: true })
        .add(iconTimeline, 0)
        .add(cardTimeline, animationDuration / 24)
        .add(scoreTimeline, animationDuration / 4)
        .call(onUpdate, null, animationDuration / 4)
        .eventCallback('onComplete', () => {
            onComplete()
            mainTimeline.seek(0).pause()
        })

    return mainTimeline
}