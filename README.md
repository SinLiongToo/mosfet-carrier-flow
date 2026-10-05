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

## Current mirror tab (`#current-mirror`)
- **Basic mirror** – diode-connected M1 sets VGS, M2 copies Iref × W2/W1; live cross-sections of both, Iout vs Vout with compliance, output resistance 1/(λ·Iout), channel length, ΔVth mismatch
- **Cascode mirror** – four transistors, node X held still: Rout ≈ gm·ro² vs basic, and the extra headroom it costs
- **Current DAC** – one reference driving 1×/2×/4×/8× branches of unit transistors with random Vth (seeded "new chip"), common-centroid layout view, staircase, INL / DNL

## Power tab (`#power`) – how a chip's supply voltage is set
- **LDO** – error amplifier drives a pass PMOS (live cross-section): Vout = Vref·(1 + R1/R2); animated load-step transient on a scope, dropout and efficiency ≈ Vout/Vin
- **Buck (DC-DC)** – high-side PMOS / low-side NMOS switching (live cross-sections), Vout = D·Vin, PWM ramp/SW/iL/ripple waveforms, efficiency vs load
- **PMIC + DVFS** – two bucks and an LDO in one chip; the CPU writes a VSEL code over I²C and the core rail slews to the new voltage; power breakdown per rail

## 77 GHz radar tab (`#radar`) – frequency synthesizer for ADAS
- **PLL synthesizer** – XO → PFD → CP → LF → VCO (19–20 GHz) → ×4 → 76–81 GHz; ramp generator + ΣΔ change the fractional divide ratio N to make the chirp; MOS-varactor cross-section with C–V and f–V curves; chirp tracking error and phase-noise budget (ref/CP, ΣΔ, VCO) vs loop bandwidth, fref and ΣΔ order
- **FMCW radar** – TX chirp and delayed echo, beat frequency fb = 2RS/c, IF signal, FFT range spectrum (two-target resolution), ΔR = c/2B, Rmax, Doppler

## RF passives tab (`#rf-passives`)
- **S-parameters** – a line section (Zl, θ) between two 50 Ω ports: animated incident / reflected / transmitted waves, standing wave and VSWR, power balance, |S11| and |S21| vs frequency, Smith chart
- **Coupler** – coupled-line directional coupler: four ports with live dB values, backward coupled wave, even / odd-mode cross-sections (Z0e, Z0o), 90° between through and coupled, response vs frequency and output phasors
- **Balun** – LC lattice balun (single-ended → differential): V+ / V− waveforms and phasors, amplitude and phase balance, common mode, match vs load and capacitor error
- **Antenna** – centre-fed dipole: current standing wave, radiating wavefronts, E-plane pattern, induced-EMF input impedance, directivity, S11 vs frequency
- **Waveguide TE / TM** – WR-90 with TE10, TE20, TE01, TE11, TM11, TM21: cross-section E / H fields, side view (propagating or evanescent), ray picture, cutoff, λg, vp / vg, dispersion and mode chart
- **Filters** – LC ladder low-pass / high-pass, Butterworth or Chebyshev 0.5 dB, order 1–7: schematic with element values, input / output waveforms, power transmitted / reflected / lost, |S21| and |S11| vs frequency, group delay, inductor Q; **transmission-line** version: stepped-impedance microstrip low-pass and short-circuited λ/8 stub high-pass (Richards), with their spurious passband / notch; **cavity / waveguide** version: air-filled coaxial rod-and-disc low-pass and a TE10 waveguide high-pass (evanescent below cutoff); **band-pass** in all three: LC resonators, λ/4 short-circuited stubs, and a coupled-cavity filter (coupling-matrix model with k, Qe, unloaded Qu and the field in each cavity)

## MIMO & beams tab (`#mimo`)
- **Beam steering** – N-element phased array: live wavefront field, steering angle, element spacing (grating lobes), phase-shifter bits, Hann taper; beam pattern and element phases
- **Beam switching** – fixed codebook (Butler-matrix-like) vs continuous steering with a car crossing the field of view: selected beam, crossover loss, sweep time
- **MIMO virtual array** – Ntx × Nrx → virtual array (TDM animation), angle spectrum of two close targets with RX only vs MIMO, resolution vs channels
- **Car: one module vs many** – cascaded imaging radar vs five standard radars vs imaging + corners: coverage, front resolution (two cars side by side), chips, modules, rough cost

Every tab has hover/tap explanations on its readouts and equations, plus an **Explain the terms** panel: a step-by-step walkthrough, live tables computed from the current settings, and a glossary.

Light / dark theme toggle (follows the system by default).

Every plot and animation has a zoom button in its top-right corner.

English / 繁體中文 toggle (globe button in the header, remembered per browser). The `I18N_ZH` table and the small switcher in the head of `index.html` swap the page text, tooltips and canvas labels, so equations and numbers stay live.
