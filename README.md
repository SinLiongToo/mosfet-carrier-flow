# MOSFET Carrier Flow

Interactive animation of how MOS transistors work, for learners.

**Live:** https://sinliongtoo.github.io/mosfet-carrier-flow/

## Transistor tab
- NMOS / PMOS toggle
- 5 stages: Off → Depletion → Inversion → Linear (triode) → Saturation, with a guided tour
- VGS / VDS sliders, live current equation with substituted numbers
- Sweep mode: sweep VDS (at fixed VGS) or VGS (at fixed VDS) and watch the operating point trace the I–V curve
- Output (ID–VDS) and transfer (ID–VGS) plots
- **Channel effects:** channel length L, body bias, and toggles for channel-length modulation, body effect, DIBL and velocity saturation, compared against the ideal model

## CMOS inverter tab (`#inverter`)
- Schematic with animated supply current, plus live PMOS and NMOS cross-sections
- Vin slider / sweep, PMOS:NMOS width ratio
- Voltage transfer curve with operating regions A–E and switching point VM, supply-current plot
- Channel effects (L, CLM, DIBL, velocity saturation) with the ideal curve dashed for comparison
- No body effect: each source sits at its body's voltage (VSB = 0)

## Body effect tab (`#body-effect`)
Circuits where a source is *not* tied to its body, with the body effect switchable and an adjustable γ:
- **NAND2** – top NMOS of the stack sits on node X (VSB = VX)
- **NOR2** – lower PMOS of the stack sits on node Y (VBS = VDD − VY)
- **Pass transistor** – animated charging of CL to a weak 1 = VDD − Vth(Vout); optional transmission gate
- **Source follower** – level shift grows with Vin, gain Av = 1/(1 + η)

Each shows the schematic, cross-sections of the affected transistor vs a reference, the response with/without body effect, and Vth vs VSB.

## Power tab (`#power`) – how a chip's supply voltage is set
- **LDO** – error amplifier drives a pass PMOS (live cross-section): Vout = Vref·(1 + R1/R2); animated load-step transient on a scope, dropout and efficiency ≈ Vout/Vin
- **Buck (DC-DC)** – high-side PMOS / low-side NMOS switching (live cross-sections), Vout = D·Vin, PWM ramp/SW/iL/ripple waveforms, efficiency vs load
- **PMIC + DVFS** – two bucks and an LDO in one chip; the CPU writes a VSEL code over I²C and the core rail slews to the new voltage; power breakdown per rail

Light / dark theme toggle (follows the system by default).
