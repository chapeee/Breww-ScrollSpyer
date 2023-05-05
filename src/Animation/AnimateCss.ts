import { AnimationOptionsInterface } from "../Common_interfaces/Animation_Interface";
import 'animate.css/source/_vars.css';
import 'animate.css/source/_base.css';
import 'animate.css/source/attention_seekers/headShake.css'; // import the specific CSS file you need
class AnimateCss {
  // constructor() {
    
  //   try {
  //     const _ = require('animate.css');
  //     // or import _ from 'lodash'; for ES6 modules
  //     console.log('lodash is installed');
  //   } catch (error) {
  //     console.log('lodash is not installed');
  //   }
  // }
  private static animLibrary = 'animated';
  private static fadeUpAnimation(element: HTMLElement) {
    // implementation here
  }
  
  private static fadeDownAnimation(section: HTMLElement) {
    console.log(section);
  }

  private static initAnimation(section: HTMLElement) {
  
    const animtype = section.getAttribute('anim-type');
    if (animtype && animtype.trim() !== '') {
      section.classList.add(AnimateCss.animLibrary);
      section.classList.add(animtype.trim());
    }
  }

  
  private static revertAnimation(sections: NodeListOf<HTMLElement>) {
    const sectionsArray = Array.from(sections);
    sectionsArray.forEach((section) => {
      const animtype = section.getAttribute('anim-type');
      if (animtype && animtype.trim() !== '') {
        section.classList.remove(animtype.trim());
      }
    });
  }

  public static animateTwoWay(section: HTMLElement, sections: NodeListOf<HTMLElement>, animationOptions:AnimationOptionsInterface) {
    if(!animationOptions.enabled) return false
    if (!(section instanceof HTMLElement)) {
      throw new Error("First argument must be of type HTMLElement");
    }

    if (!(sections instanceof NodeList) || sections.length === 0 || !(sections[0] instanceof HTMLElement)) {
      throw new Error("Second argument must be of type NodeListOf<HTMLElement> and cannot be empty");
    }
    AnimateCss.revertAnimation(sections);
    AnimateCss.initAnimation(section);   
  }

  public static animateOneWay(section: HTMLElement, animationOptions:AnimationOptionsInterface) {
    if(!animationOptions.enabled) return false
    if (!(section instanceof HTMLElement)) {
      throw new Error("First argument must be of type HTMLElement");
    }
    AnimateCss.initAnimation(section);
  }
}

export default AnimateCss;