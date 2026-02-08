---
layout: post
title: Throttle-controlled Powered Landings: Adding Instantaneous Flight Path Angle to the Calculation
---

In my last post, we discussed the ideal landing burn equation that is based off of a spacecraft’s instantaneous velocity, height, and maximum throttle capability to cut off all vertical velocity at the moment it reaches an altitude of zero. While it presented a temporary solution to not over-throttle or under-throttle, it had its realistic limitations, which are also outlined in the article’s conclusion:

- The model assumes 0-100% throttle capability, which is near impossible given current liquid-fuel engine technology.
- The model ignores mass changes due to fuel consumption and atmospheric drag (when present)
- The model assumes the spacecraft has minimal horizontal velocity and is pointing vertically.

For the third limitation, when landing in any way, controlled or not, the spacecraft will always approach the ground with some horizontal velocity, which is paired with the vertical velocity to give the absolute velocity (the value displayed in Kerbal Space Program). What a retrograde burn does is it cuts both horizontal and landing velocity at the same rate (not by the same acceleration for each value).

Because the spacecraft is approaching the ground at a decreasing angle (relative to the local vertical), the total distance covered by the burn will be greater than its current radar height, which we used in the last model, leading to inaccuracies.

In this post, we will directly address that limitation by correcting our equation to include the instantaneous flight path angle when the landing burn starts and line-of-sight to the target landing location (or the downrange distance) to calculate the total distance the landing burn will cover.

### Model

Due to the increased complexity of this model, we shall define a few new variables and redefine duplicates used in the last post.

For variables in the last post,

- $$∆x$$, or total distance covered during descent, will be replaced by $$d$$;
- $$v_{initial}$$ will be replaced by $$v_{burn}$$ or $$v_{abs}$$, defined underneath;
- $$h$$ will be replaced by $$h_{burn}$$, denoting the spacecraft’s vertical displacement from the target landing zone.

For new variables,

- $$\gamma$$ will stand for the angle formed by the local vertical and the spacecraft’s retrograde vector, measured in degrees. Shown with the green tangent in Figure 1.;
- $$\theta$$ is the angle formed by the local vertical on the spacecraft and the straight line connecting its position to its targeted landing zone. Shown with the blue angle in Figure 1.;
- $$v_y$$ will be the spacecraft’s vertical velocity;
- $$v_x$$ will be the spacecraft’s horizontal velocity;
- $$v_{abs}$$ will be the spacecraft’s resultant velocity;
- $$x_{target}$$ will be the downrange distance between the spacecraft’s position and its landing site;
- $$x$$ will be the spacecraft’s horizontal displacement, direction not accounted for. We shall assume that the spacecraft is at $$x=0$$ at the start of the landing burn and the measurements of its conditions, and the coordinate system remains in its original position as the landing burn continues;
- $$y$$ will be the spacecraft’s vertical displacement;
- $$d$$ will be the total distance the spacecraft travels for its landing;
- A subscript or description of “projected” will stand for the conditions of the spacecraft if no landing burn takes place;
- A subscript or description of “powered” will stand for the conditions of the spacecraft when the landing burn takes place immediately after measurement of its conditions;
- $$a$$ is a trajectory curve constant used to determine the curvature of the spacecraft’s powered trajectory, explained later.

<div class="figure">
  <img src="/assets/images/Poweredvsprojected.png" class="post-image">

  <p class="caption">
    Figure 1
  </p>
</div>

We can model the spacecraft’s projected trajectory with a parabolic trajectory on a Cartesian plane with the $$x$$ and $$y$$ axes being the horizontal and vertical positions of it. The constant is the spacecraft’s altitude at the start of the landing burn, and the $$y$$ value of the function’s vertex is the trajectory’s apoapsis. From comparing the horizontal and vertical velocities, we can determine that the slope of this function is the cotangent of the spacecraft’s angle.

$$\frac{dy}{dx} = \frac{v_y}{v_x}$$
$$\gamma = tan^{-1}(\frac{v_x}{v_y})$$
$$\frac{dy}{dx} = cot(\gamma)$$

This value will function like the graph from earlier to determine the feasibility envelope of landing at a certain site. The $$\gamma$$ value must be greater than the angle to the targeted landing site ($$\theta$$), as a retrograde burn will decrease the horizontal velocity of the craft.

We will also model the spacecraft’s powered descent using a Cartesian plane. To determine the $$d$$ value, we must first determine what this function is. 

$$y_{powered} = ax^2+bx+c$$
$$y_{powered}’ = 2ax+b$$

Where $$a$$ is the variable descent rate we have to calculate, $$b$$ is the slope of the function at $$x=0$$ (determined through $$cot(\gamma)$$), and $$c$$ is $$h_burn$$. 

The $$a$$ value can be determined by plugging in a second coordinate, in this case being the landing site at $$(x_target,0)$$.

$$a = \frac{y_2 - b(x_2) - c}{(x_2)^2}$$
$$a = \frac{0 - cot(\gama)(x_{target}) - h_burn}{(x_{target})^2}$$

The final variable we have to solve for it $$x_target$$, the downrange distance to our landing zone. This can be found in a number of ways, such as radar, but can also be calculated by multiplying the altitude to the tangent of the angle to the landing site.

$$tan(\theta) = \frac{x_{target}}{h_{burn}}
$$x_{target} = h_{burn}tan(\theta)

Using the formula for arc length,

$$L = \int_{0}^{k} \sqrt{1 + [f'(x)]^2} \, dx$$

We can determine the final distance traveled during the landing burn.

$$d = \int_{0}^{x_{target}} \sqrt{1 + (2ax+cot(\gamma))^2} \, dx$$

By plugging that result into the equation we derived in the earlier post,

$$d = \int_{0}^{x_{target}} \sqrt{1 + (2ax+cot(\gamma))^2} \, dx = \frac{v_{burn}^2}{2(n F_{Thrust}/m g-g}$$)

And solving for the $$n$$ value, we can conclude a better throttle value for our landing burn engines.

### Conclusion and limitations

In this model, $$x_{target}$$ does not have a cardinal direction, which means that the model assumes that the retrograde vector is pointing in the same direction as the landing site. However, this can be easily adjusted through the use of grid fins.

The model still ignores the first few limitations, throttle capacity, mass change, and atmospheric drag. Future studies will be conducted to further perfect this model, including to account for torque/tumbling, center-of-mass changes, and terminal velocity.

This model also requires the flight computer (or KSP player pausing the game) to complete a complicated calculation involving integrals near-instantaneously. An update to this specific post will suggest a closed-form solution to make the calculation simpler.
