import { useState, useEffect, useRef } from "react";

// ─── install library ─────────────────────────────────────────────────────────
// built from transcripts. covers all four pillars.
const TRAINING_LIBRARY_BASE = [

  // strategic core
  {
    id: "purpose",
    name: "purpose",
    pillar: "strategic core",
    subPillar: null,
    tags: [
      "no clear direction", "don't know why we exist", "can't articulate what we're about",
      "team don't understand what we stand for", "hard to attract the right clients",
      "hard to attract the right staff", "no compelling reason to work with us",
      "feels like we just make money", "no real identity", "can't get people bought in",
      "no guiding principle", "not sure what makes us different",
    ],
    summary: "defines the company's reason for existing in a short, feeling-based statement that attracts the right clients and team and gives the founder a guiding principle beyond revenue.",
    constraint: "the business lacks a clear identity that inspires the team, attracts the right clients, and gives the founder something to push through hard times for.",
  },
  {
    id: "mission",
    name: "mission",
    pillar: "strategic core",
    subPillar: null,
    tags: [
      "team unfocused", "everyone doing their own thing", "no shared direction",
      "people making decisions on assumptions", "no big picture goal", "no 3-5 year target",
      "can't get everyone aligned", "no measurable company goal", "operating in silos",
      "don't know where the business is going", "can't communicate direction to the team",
      "no roadmap", "strategy is unclear",
    ],
    summary: "builds a specific, measurable 3-10 year company goal in smart goal format that gives the team a shared direction and stops everyone operating on their own assumptions.",
    constraint: "the team is unfocused because there is no clear shared mission that tells everyone where the business is going and how it plans to get there.",
  },
  {
    id: "values",
    name: "values",
    pillar: "strategic core",
    subPillar: null,
    tags: [
      "poor performers", "wrong culture", "bad fit hires", "keep hiring wrong people",
      "difficult clients", "clients not paying", "constant fires", "no standards",
      "people behaving differently", "no consistency in how team acts",
      "no basis for hiring or firing", "can't define what good looks like",
      "team doesn't reflect what i want the business to be",
      "values misalignment", "no culture", "team just doing their job not bought in",
    ],
    summary: "defines the company's values with specific behavioural interpretations so they become the foundation for every hiring, firing, and client decision — not just words on paper.",
    constraint: "the business has no defined values, or the values aren't real enough to use as a filter for who gets hired, who stays, and who the business works with.",
  },
  {
    id: "vision-clarity-process",
    name: "vision clarity process",
    pillar: "strategic core",
    subPillar: null,
    tags: [
      "too many ideas", "nothing gets implemented", "going in circles", "no execution",
      "can't turn vision into action", "team coming to me for every decision",
      "no department strategy", "no goals by department", "vision but no plan",
      "can't get the team to make decisions without me", "leadership has no direction",
      "ideas person but stuck on execution", "can't turn the big picture into actual work",
    ],
    summary: "turns the company vision into a department-by-department action document — with strategy and specific goals for each area — so the team can make decisions and work independently without the founder connecting every dot.",
    constraint: "the founder has a vision but no structure to translate it into departmental strategy and goals, so everything still routes back to them.",
  },
  {
    id: "365s",
    name: "365's™",
    pillar: "strategic core",
    subPillar: null,
    tags: [
      "no annual goals", "don't know what i'm working towards this year",
      "busy but not sure if it's the right work", "can't share direction with the team",
      "no 12 month plan", "clients dictating workflow", "morphed into a business",
      "revenue growing but no clear target", "goals not written down",
      "team doesn't know what we're trying to achieve this year",
      "no measurable annual targets", "hard to prioritise without a clear goal",
    ],
    summary: "builds 3-5 specific, measurable annual goals using a smart goal format and brain-dump process, then maps the steps between where the business is now and where it needs to be in 12 months.",
    constraint: "the founder is busy but without clear annual goals, work is driven by whoever asks first rather than what actually moves the business forward.",
  },
  {
    id: "nrt-laser-focus",
    name: "nrt™ laser focus",
    pillar: "strategic core",
    subPillar: null,
    tags: [
      "too much on my plate", "trying to fix too many things at once", "frazzled",
      "can't prioritise", "keep starting things and not finishing", "shiny object syndrome",
      "half-finished projects everywhere", "don't know what to focus on",
      "everything feels urgent", "can't get traction on anything",
      "keep getting pulled off what i'm working on", "no quarterly focus",
      "running at too many things", "burnout risk", "all things to all people",
    ],
    summary: "identifies the single highest-leverage constraint to fix in the next 1-3 months and installs the accountability structure to stay focused on it until it's done.",
    constraint: "the founder is attempting too many things at once and making no real progress on any of them because there is no single prioritised focus.",
  },
  {
    id: "rah-rah-meeting",
    name: "rah-rah™ meeting",
    pillar: "strategic core",
    subPillar: null,
    tags: [
      "team resistant to change", "can't get buy-in", "team don't understand why things are changing",
      "people confused about direction", "culture feels flat", "losing good people to uncertainty",
      "can't get everyone aligned", "team sceptical", "morale is low",
      "need to enrol the team in a new direction", "about to make big changes",
      "team doesn't understand the vision", "need to get everyone on the same page",
      "staff scared of what's coming", "team operating without belief in where we're going",
    ],
    summary: "a structured all-hands meeting that brings the team into the company's purpose, mission and values and gets genuine buy-in for where the business is going before changes are introduced.",
    constraint: "the founder has a clear direction but the team isn't enrolled in it, creating resistance, confusion or disengagement when changes start to happen.",
  },

  // slick operations — team
  {
    id: "recruit-hire",
    name: "the process to recruit and hire top talent",
    pillar: "slick operations",
    subPillar: "team",
    tags: [
      "wrong hire", "bad hire", "hired someone who isn't working out", "can't find good people",
      "no one good out there", "recruiting", "hiring", "keep hiring the wrong person",
      "desperate hire", "rushed recruitment", "high turnover", "people keep leaving",
      "mediocre team", "hard to find talent", "dragging people along", "retrofitting",
    ],
    summary: "an 11-step recruitment process that gets values-aligned people into the right roles before desperation forces the wrong decision.",
    constraint: "hiring the wrong people, or struggling to find anyone worth hiring at all.",
  },
  {
    id: "successful-onramp",
    name: "the successful onramp",
    pillar: "slick operations",
    subPillar: "team",
    tags: [
      "onboarding", "new hire isn't performing", "new person isn't up to speed",
      "left them to figure it out", "assumed they knew what to do", "person started and flopped",
      "hire started badly", "no onboarding process", "first 90 days", "new team member struggling",
      "keep having to re-explain things", "person isn't hitting their KPIs yet",
    ],
    summary: "a 90-day onboarding and ramp-up structure that sets expectations from day one and gets new hires to full performance without the founder holding their hand.",
    constraint: "new hires not getting up to speed, or the founder still carrying them past the first month.",
  },
  {
    id: "ultimate-playbook",
    name: "the ultimate playbook for any role",
    pillar: "slick operations",
    subPillar: "team",
    tags: [
      "no playbook", "everything in my head", "nobody knows what to do", "team asks me everything",
      "someone left and took all the knowledge", "lost company ip", "no documented processes",
      "people go rogue", "inconsistent standards", "keep repeating myself",
      "can't hold people accountable", "no clear expectations", "role isn't defined",
      "team doesn't know what good looks like", "no sops", "not written down",
    ],
    summary: "a documented playbook structure for every role in the business that gets company knowledge out of heads and into a format the team can operate from independently.",
    constraint: "the founder is the only one who knows how things should be done, and the team keeps coming back to ask.",
  },
  {
    id: "training-calendar",
    name: "coordinating your team training calendar",
    pillar: "slick operations",
    subPillar: "team",
    tags: [
      "team isn't improving", "no training plan", "ad hoc training", "random development",
      "people not getting better", "no consistency in upskilling", "team feels stuck",
      "high turnover because people don't feel invested in", "no structure around team development",
      "licenses expiring", "cpd points piling up", "training never happens",
    ],
    summary: "a structured training calendar that makes team development consistent and planned, so it actually happens instead of getting pushed to tomorrow.",
    constraint: "team development is ad hoc or non-existent, and the cost is showing up in performance or retention.",
  },
  {
    id: "hiring-ops-manager",
    name: "hiring an operations manager",
    pillar: "slick operations",
    subPillar: "team",
    tags: [
      "need an ops manager", "considering hiring a gm", "want someone to run the day-to-day",
      "need to get out of operations", "overwhelmed by running the business",
      "everything falls to me", "no one managing the team", "no second in charge",
      "can't step back without it breaking", "need someone between me and the team",
      "considering a coo", "operations all on my plate",
    ],
    summary: "a framework for deciding if you're ready to hire an operations manager, designing the role properly, and using it to remove yourself from the day-to-day for good.",
    constraint: "the founder is still running operations and needs a person and a structure to hand it to.",
  },

  // slick operations — systems
  {
    id: "optimise-customer-journey",
    name: "how to optimise the customer journey",
    pillar: "slick operations",
    subPillar: "systems",
    tags: [
      "inconsistent service", "delivery varies depending on who does it", "customer experience is unreliable",
      "don't know what happens after the sale", "no consistent process for clients",
      "team handles clients differently", "customers don't know what to expect",
      "quality control", "service inconsistency", "client experience is a mess",
      "no end-to-end process", "partner experience depends on the person",
    ],
    summary: "maps the entire customer journey from first contact to completion, then optimises every step so delivery is consistent regardless of who on the team handles it.",
    constraint: "the customer experience is inconsistent because there is no defined end-to-end process the whole team follows.",
  },
  {
    id: "centralise-workflow-1",
    name: "centralise your workflow, workload, & communications: part 1",
    pillar: "slick operations",
    subPillar: "systems",
    tags: [
      "can't keep track of tasks", "things falling through the cracks", "don't know what the team is working on",
      "no task management", "everything scattered", "no project management software",
      "head is full of everything", "can't delegate properly", "mental load too high",
      "tasks go missing", "no visibility on what's being worked on",
    ],
    summary: "makes the case for and sets up a centralised task and project management system so the founder can hand off work and know it will get done without carrying it all mentally.",
    constraint: "the founder is holding all the tasks in their head because there is no central system showing who owns what and where it is up to.",
  },
  {
    id: "centralise-workflow-2",
    name: "centralise your workflow, workload, & communications: part 2",
    pillar: "slick operations",
    subPillar: "systems",
    tags: [
      "setting up monday.com", "how to use project management software", "task board setup",
      "workflow setup", "building a task system", "tracking client progress",
      "automating task assignment", "can't get the team using the system",
    ],
    summary: "the hands-on build — how to set up boards, assign tasks, track the customer journey, and get the whole team operating from one central workflow.",
    constraint: "the founder has chosen a task management tool but needs to build it out properly so the team actually uses it.",
  },
  {
    id: "work-once-1",
    name: "work once, get paid forever: part 1",
    pillar: "slick operations",
    subPillar: "systems",
    tags: [
      "no documented processes", "team operating in isolation", "different people do things differently",
      "company ip not written down", "inconsistent results", "people going rogue",
      "sick of repeating myself", "nothing is systemised", "no standard way of doing things",
      "business relies on certain people knowing how to do things",
    ],
    summary: "the first step to mapping every business process — starting with one department and building a documented workflow the whole team operates from, so results stop depending on who's doing the work.",
    constraint: "the business has no documented processes and results depend on whoever happens to be doing the work.",
  },
  {
    id: "work-once-2",
    name: "work once, get paid forever: part 2",
    pillar: "slick operations",
    subPillar: "systems",
    tags: [
      "building process maps", "miro workflow", "systemising the business visually",
      "mapping out the sales process", "documenting lead follow-up", "process documentation",
      "how to build a process map", "want to map out how things actually work",
    ],
    summary: "shows exactly what documented process maps look like in practice — using real sales and operations examples — and how to build them in Miro so the team has a single source of truth.",
    constraint: "the founder understands they need to document processes but doesn't know what that looks like in practice or how to build it.",
  },
  {
    id: "systemising-conversions",
    name: "systemising conversions",
    pillar: "slick operations",
    subPillar: "systems",
    tags: [
      "don't know our conversion rate", "leads going cold", "no crm", "crm not being used properly",
      "leads falling through the cracks", "no follow-up system", "sales process inconsistent",
      "losing leads we've paid for", "no visibility on the sales pipeline",
      "team chasing leads differently", "can't track where leads are up to",
      "marketing working but sales not converting", "no automation in sales",
    ],
    summary: "installs a CRM and conversion tracking system so every lead gets followed up consistently, conversion rates are visible at every stage, and the sales process doesn't depend on the founder.",
    constraint: "leads are being lost because there is no structured follow-up system, and the founder has no visibility on what is converting and why.",
  },
  // seal team — batch 2 (all 9 remaining)
  {
    id: "team-temp-check",
    name: "team temp check",
    pillar: "seal team",
    subPillar: null,
    tags: [
      "team not performing", "can't put my finger on what's wrong", "inconsistent execution",
      "don't know if it's a values problem or a skills problem", "frustrated with the team",
      "team not hitting the mark", "no clear picture of where each person is at",
      "performance is all over the place", "can't measure the team objectively",
      "need to audit the team", "not sure who to develop and who to move on",
    ],
    summary: "a quarterly values and skills audit for every team member that gives the founder a clear, objective score for each person — identifying exactly what needs developing and whether each person is worth investing in.",
    constraint: "the founder is frustrated with team performance but has no structured way to measure where each person is actually at, so development and decisions stay gut-feel and inconsistent.",
  },
  {
    id: "underperforming-staff",
    name: "under performing staff",
    pillar: "seal team",
    subPillar: null,
    tags: [
      "someone not performing", "staff member not pulling their weight", "person inconsistent",
      "on and off performer", "negative influencer in the team", "toxic team member",
      "can't decide whether to keep or let go", "avoiding the decision",
      "values misalignment", "person good at their job but wrong attitude",
      "extended probation", "not sure if it's a values or skills issue",
      "staff member gossiping or dragging culture", "not acting with integrity",
    ],
    summary: "a decision framework using the team temp check scores to work out — values, skills, coachability, and time — whether an underperforming team member stays with a plan, or needs to go.",
    constraint: "the founder has a team member who isn't performing or isn't values-aligned and is stuck in indecision about whether to invest in them or move them on.",
  },
  {
    id: "ownership-map",
    name: "ownership map™",
    pillar: "seal team",
    subPillar: null,
    tags: [
      "no org chart", "no people plan", "don't know who does what", "unclear roles",
      "everything comes back to me", "no structure around who owns what",
      "don't know who to hire next", "hiring reactively", "no 12-month people plan",
      "can't reverse engineer the team needed to hit the goals",
      "founder still in every role", "no visibility on where the gaps are",
    ],
    summary: "builds a 12-month and 3-year people plan — mapped to the annual goals — that shows who owns what, where the gaps are, and which hire to prioritise first to start getting work off the founder's plate.",
    constraint: "the founder has no structured view of who needs to be in the business to hit the goals, so hiring is reactive and the founder stays in roles they should have exited.",
  },
  {
    id: "game-changing-jds",
    name: "game changing job descriptions",
    pillar: "seal team",
    subPillar: null,
    tags: [
      "no job descriptions", "job descriptions not detailed enough", "mistakes keep happening",
      "unclear who's responsible for what", "profit leaking from rework", "clients unhappy",
      "things fall through the cracks", "roles overlap", "role too broad", "unrealistic job expectations",
      "hired someone and they couldn't do the job", "no defined outcomes for roles",
      "can't hold people accountable without a jd",
    ],
    summary: "builds clear, outcome-focused job descriptions for every role in the business — with purpose, responsibilities, required skills and key relationships — so accountability is defined, mistakes stop recurring, and margins stop leaking.",
    constraint: "roles in the business are not clearly defined, so mistakes keep happening, profit leaks through rework, and the founder can't hold people accountable to a standard that was never written down.",
  },
  {
    id: "creating-kpi-ownership",
    name: "creating kpi ownership",
    pillar: "seal team",
    subPillar: null,
    tags: [
      "no kpis", "kpis not being hit", "team don't know if they're doing well",
      "no measurement of success", "can't tell if someone's performing",
      "no accountability to outcomes", "tasks being done but results missing",
      "managing activity not outcomes", "team doing their version of good",
      "no reporting from the team", "founder doing all the tracking",
    ],
    summary: "creates specific, measurable KPIs for every role — quantitative and values-based — and transfers ownership of tracking and reporting to each team member so the founder gets accountability without micromanaging.",
    constraint: "the business has no KPIs or the KPIs that exist aren't owned by the team, so the founder has no clear measure of whether roles are being performed to standard.",
  },
  {
    id: "guarantee-team-success",
    name: "guarantee team success",
    pillar: "seal team",
    subPillar: null,
    tags: [
      "kpis in place but not being used", "no meeting cadence around kpis", "kpis just on paper",
      "team not hitting targets consistently", "no structure for kpi check-ins",
      "values not making it into day-to-day", "huddles not in place", "no weekly rhythm",
      "no buy-in from the team on targets", "know what to measure but not how to make it stick",
    ],
    summary: "installs the cadence of meetings — daily huddles, weekly reports, monthly one-to-ones — that makes KPIs real, keeps values front-of-mind week to week, and creates the accountability rhythm that turns targets on paper into targets being hit.",
    constraint: "the founder has set KPIs and job descriptions but hasn't built the meeting rhythm that makes the team accountable to them, so nothing has actually changed on the floor.",
  },
  {
    id: "performance-manage-outcomes",
    name: "performance manage outcomes",
    pillar: "seal team",
    subPillar: null,
    tags: [
      "team not taking ownership", "always solving their problems", "team wait for me to fix things",
      "bottleneck for everything", "lack of urgency", "team don't think ahead",
      "no proactive problem solving", "team reactive not proactive",
      "people sit on their hands", "constantly drip feeding",
      "team come with problems not solutions", "projects stall and no one escalates",
    ],
    summary: "shifts the team from task-followers to outcome-owners by combining structured planning with coaching questions that get people thinking ahead, troubleshooting problems before they happen, and taking full accountability for results.",
    constraint: "the team are executing tasks but not taking ownership of outcomes, so the founder is still the person who solves every problem when something goes off script.",
  },
  {
    id: "team-development-plans",
    name: "team development plans",
    pillar: "seal team",
    subPillar: null,
    tags: [
      "no development plans", "no career path for staff", "people leaving because no growth",
      "team stuck at the same level", "can't retain good people long term",
      "no investment in the team", "team don't feel invested in",
      "no plan for upskilling", "attrition from lack of progression",
      "losing people after 12-18 months", "good people plateau and leave",
    ],
    summary: "builds individual growth plans for every team member — based on their temp check scores, strengths and development gaps — with diarised quarterly reviews so development is tracked and people can see a future in the business.",
    constraint: "the business has no structured development plans, so good people can't see a path forward and leave, while underperformers stay stuck with no clear direction to improve.",
  },
  {
    id: "respect-yourself",
    name: "respect yourself",
    pillar: "seal team",
    subPillar: null,
    tags: [
      "avoid difficult conversations", "let things slide", "nice guy syndrome",
      "scared to lose staff", "don't want to rock the boat", "things blow out because not addressed early",
      "can't hold boundaries", "team walk all over me", "don't pull people up",
      "standards drop and nobody says anything", "problems snowball",
      "uncomfortable with confrontation", "want to be liked",
    ],
    summary: "a three-lens framework and conversation scripts that give the founder a structured way to identify why performance is off and have the direct conversation that nips it in the bud — before small things become big ones.",
    constraint: "the founder avoids difficult conversations and lets standards slide until problems are too big to ignore, because there is no framework for having those conversations early and directly.",
  },
  {
    id: "how-to-put-together-leadership-team",
    name: "how to put together a leadership team",
    pillar: "seal team",
    subPillar: null,
    tags: [
      "no leadership team", "doing everything myself", "no second in charge",
      "no one to delegate to", "no clear progression in the team", "good people leaving because no growth",
      "promoting the wrong person", "promoted someone and it didn't work",
      "need to build a leadership layer", "no one underneath me who can lead",
      "phase one of exit", "selling a job not a business",
    ],
    summary: "a step-by-step process for identifying, designing and filling a leadership layer — starting from the ownership map and job description, then assessing current staff or going to market.",
    constraint: "the founder has no leadership layer in place and is shouldering all responsibility, with no clear path for progression that keeps good people.",
  },
  {
    id: "unlock-your-team",
    name: "unlock your team (to unlock your time)",
    pillar: "seal team",
    subPillar: null,
    tags: [
      "leadership team not stepping up", "still solving their problems", "team lack confidence",
      "promoted from within but they can't lead", "team good at their job but can't make decisions",
      "too many unnecessary meetings", "still being the decision-maker for everything",
      "team come to me for every answer", "new leaders not performing", "leadership team not taking ownership",
      "influential people in the wrong direction", "negative culture driver",
    ],
    summary: "gives newly appointed or underconfident leaders a decision-making framework so they stop escalating every problem upward and start making values-aligned decisions independently.",
    constraint: "the founder put a leadership team in place but is still the person solving problems, because the leaders lack the confidence or framework to make decisions without escalating.",
  },
  {
    id: "earn-the-right",
    name: "earn the right",
    pillar: "seal team",
    subPillar: null,
    tags: [
      "processes not being followed", "team ignoring the rules", "can't hold boundaries",
      "friends with staff", "long-tenured staff not stepping up", "team not buying in",
      "kpis in place but nobody hits them", "structure exists but doesn't work",
      "values not lived in practice", "team don't follow the founder's lead",
      "recruitment and onboarding not values-based", "people not accountable to standards",
    ],
    summary: "a practical framework for leading from the front — covering technical ability, work ethic, emotional intelligence, team knowledge and inside-out buy-in — so the team follows because the founder has earned the right, not just because of the title.",
    constraint: "the founder has processes and KPIs in place but the team isn't following them, because the leadership foundation — values, culture and buy-in — was never built first.",
  },
  {
    id: "influence-with-confidence",
    name: "influence with confidence",
    pillar: "seal team",
    subPillar: null,
    tags: [
      "can't influence the team", "standards sliding", "team does what they want",
      "no urgency", "team don't do the right thing when i'm not there",
      "team dumps problems on me", "nobody comes with solutions",
      "can't keep boundaries", "not a true captain of the ship",
      "can't make decisions in uncertain situations", "team has no accountability to standards",
      "lack of integrity in the business",
    ],
    summary: "builds the founder's personal leadership character and integrity first, then cascades that standard through the business so the team operates to a consistent set of expectations without needing constant direction.",
    constraint: "the founder is not consistently influencing the team's standards and behaviour, so performance and accountability are erratic and dependent on the founder being present.",
  },
  {
    id: "what-we-do-says-who-we-are-1",
    name: "what we do says who we are: part 1",
    pillar: "seal team",
    subPillar: null,
    tags: [
      "standards sliding", "missed deadlines", "inconsistent quality",
      "team complacent", "team not living the values", "values on paper but not in practice",
      "good people want to say something but don't", "awkward culture",
      "only the owner pulls people up", "team doesn't hold each other accountable",
      "no grassroots behaviour", "values not reinforced week to week",
    ],
    summary: "turns company values into lived daily behaviour by getting every person in the business — from apprentice to owner — to talk about, display and reinforce standards week to week.",
    constraint: "values exist in the business but they are not lived consistently, and only the founder pulls people up on standards rather than the whole team holding each other accountable.",
  },
  {
    id: "what-we-do-says-who-we-are-2",
    name: "what we do says who we are: part 2",
    pillar: "seal team",
    subPillar: null,
    tags: [
      "performance flatlined", "lost a good person", "missed a goal or target",
      "complacency in the team", "business not evolving", "no next level",
      "leadership team needs to be empowered", "team not raising their own standard",
      "founder still managing not leading", "need to upgrade the type of client",
      "need to raise the bar on who we hire", "team not growing",
    ],
    summary: "a strategy for raising standards consistently — by upgrading the leadership team's autonomy, evolving the ideal client profile, and building the 2.0 version of the business so the team always has a next level to grow into.",
    constraint: "the business has plateaued and standards are slipping because there is no evolving vision pulling the team forward and no clear 2.0 for the founder to step into.",
  },
  {
    id: "too-good-to-leave",
    name: "too good to leave",
    pillar: "seal team",
    subPillar: null,
    tags: [
      "high staff turnover", "can't keep good people", "team just clock in and clock out",
      "team not inspired", "people see it as just a job", "don't know why people work here",
      "losing people to competitors", "team not passionate",
      "can't build loyalty", "team not bought into the mission",
      "intrinsic motivation missing", "people leave after 12-18 months",
    ],
    summary: "finds the link between each key team member's personal intrinsic motivation and the company's mission, purpose and values so they feel they are building their own dream alongside the founder's — and the business becomes too good to leave.",
    constraint: "the founder can't retain good people because the environment doesn't connect to what drives them personally, so the business feels like a job rather than something worth staying for.",
  },
  {
    id: "the-lucky-ceo",
    name: "the lucky ceo",
    pillar: "seal team",
    subPillar: null,
    tags: [
      "no time for strategic work", "always in the weeds", "can't get to the important stuff",
      "diary full of the wrong things", "reactive all day", "environment controls me",
      "kicking the can down the road", "never get to my own priorities",
      "doing work beneath my level", "no ideal week structure",
      "quarterly goals never get done", "no accountability to my own plan",
    ],
    summary: "structures the founder's week around the time amplifier, leader's work and weekly plan accountability so they spend 80% of their time on high-value work and stop letting the environment dictate the diary.",
    constraint: "the founder is trapped in reactive work and never gets to the strategic priorities because there is no structure protecting their time or holding them accountable to their own plan.",
  },
  {
    id: "strategising-for-the-future",
    name: "strategising for the future",
    pillar: "seal team",
    subPillar: null,
    tags: [
      "no leadership cadence", "no regular planning meeting", "plan sits on a shelf",
      "not tracking quarterly goals", "no weekly check-in on targets",
      "team don't get recognition", "feedback given too late", "team feel taken for granted",
      "no structure around forward planning", "meetings about work not about goals",
      "values not in meetings", "no consistent rhythm for the leadership team",
    ],
    summary: "installs a weekly leadership cadence — Monday huddle, one-to-ones, planning meeting, and end-of-week review — so the business runs on a consistent rhythm and quarterly goals are tracked in real time, not reviewed after they've been missed.",
    constraint: "there is no consistent meeting cadence that connects daily work to quarterly goals, so plans get made and forgotten and accountability only happens when something goes wrong.",
  },
  {
    id: "weekly-focus-meeting",
    name: "weekly focus meeting: part 1",
    pillar: "seal team",
    subPillar: null,
    tags: [
      "too many sidebar conversations", "everyone tracking different numbers",
      "no single source of truth for the business", "meetings go off track",
      "don't know the key metrics", "pulled into the weeds in every meeting",
      "can't run the business from a high level", "want to step back but no reporting structure",
      "leadership team meetings inefficient", "want to run the business in 90 minutes",
      "no structured kpi reporting", "meetings not producing decisions",
    ],
    summary: "a structured 90-minute weekly meeting format using a single spreadsheet that covers company vision, quarterly goals, departmental KPIs and action tracking — so the founder can stay out of the weeds and run the business from the numbers.",
    constraint: "the founder has no structured weekly meeting or reporting framework, so they're still pulled into operational detail and can't get a clean view of how the business is performing.",
  },
  {
    id: "focus-how-to-use-spreadsheet",
    name: "focus: how to use the spreadsheet",
    pillar: "seal team",
    subPillar: null,
    tags: [
      "don't know how to set up the focus spreadsheet", "need to build the kpi tracker",
      "setting up the weekly meeting spreadsheet", "how to populate the orbit tab",
      "how to track power blocks", "setting up company dna in the spreadsheet",
      "want to run weekly meetings but don't know how to structure the data",
    ],
    summary: "walks through how to populate the weekly focus spreadsheet — from company identity and three-year targets through to departmental KPIs, power blocks and meeting rating — so the meeting has real data to run on from week one.",
    constraint: "the founder wants to run structured weekly focus meetings but hasn't built out the spreadsheet that makes them data-driven and consistent.",
  },
];

// ─── savage margins library ───────────────────────────────────────────────────
const SAVAGE_MARGINS = [

  // savage margins — finance
  {
    id: "profit-intro",
    name: "introduction",
    pillar: "savage margins",
    subPillar: "finance",
    tags: [
      "don't know where to start with profit", "not sure which financial area to focus on",
      "business is busy but not profitable", "just need more customers isn't working",
      "leaky bucket", "adding revenue but not keeping it", "no profit strategy",
      "overwhelmed by the financial side", "not sure what the profit pillar covers",
    ],
    summary: "an orientation to the three areas of profit — finance, marketing, and sales — so the founder knows which constraint to tackle first and stops adding leads into a structurally leaky business.",
    constraint: "the founder is focused on getting more customers or revenue without first fixing the structural holes that are bleeding profit.",
  },
  {
    id: "quick-cash-1",
    name: "quick cash: part 1",
    pillar: "savage margins",
    subPillar: "finance",
    tags: [
      "cash flow tight", "bank account low", "not enough cash", "leaving money on the table",
      "customers not paying upfront", "low deposits", "long invoice terms",
      "need cash within 30 days", "can't cover payroll", "getting paid last",
      "invoice terms too long", "want to increase deposits",
    ],
    summary: "four immediate cash flow levers — reducing invoice terms, increasing deposits, offering early payment discounts, and invoicing out faster — that can generate real cash within 30 days without needing new customers.",
    constraint: "the founder needs to improve cash flow quickly and has untapped options in their payment terms, deposit structure and invoicing speed that haven't been optimised.",
  },
  {
    id: "quick-cash-2",
    name: "quick cash: part 2",
    pillar: "savage margins",
    subPillar: "finance",
    tags: [
      "customers not paying", "debtors overdue", "accounts receivable blowing out",
      "chasing invoices", "paper money but no cash", "profit on paper but not in bank",
      "no accounts receivable process", "too emotional about chasing money",
      "scared to chase debts", "work in progress sitting too long",
      "no one responsible for collections",
    ],
    summary: "builds a structured accounts receivable process — with a responsible person, KPIs, scripts and a chase cadence — so overdue invoices get collected consistently and the founder stops being the one doing it.",
    constraint: "the founder has money owed to the business that isn't being collected because there is no structured process or responsible person chasing it.",
  },
  {
    id: "pricing-optimisation",
    name: "pricing optimisation",
    pillar: "savage margins",
    subPillar: "finance",
    tags: [
      "margins too low", "undercharging", "haven't raised prices in years",
      "not sure how to justify a price increase", "worried about losing customers if prices go up",
      "giving away too much", "profit per job too thin", "rework eating margins",
      "no variation process", "paying for variations yourself", "not charging for ip",
      "minimum hours too low", "pricing not reviewed", "charging by the hour not the outcome",
    ],
    summary: "nine pricing strategies — from charging for outcomes rather than time, to variation systems, minimum charges and across-the-board increases — with a table showing how much revenue you can afford to lose before profit drops.",
    constraint: "the founder is not maximising the profit available in the work they are already doing because pricing has not been reviewed, optimised or structured around value.",
  },
  {
    id: "successful-financial-management",
    name: "successful financial management",
    pillar: "savage margins",
    subPillar: "finance",
    tags: [
      "don't understand the numbers", "not sure which financial documents to read",
      "leave it all to the accountant", "don't know my gross or net profit margin",
      "don't know my breakeven point", "profit and loss confuses me",
      "not sure what a balance sheet tells me", "no idea what my quick ratio is",
      "can't read financial statements", "financial blind spots", "flying blind on numbers",
    ],
    summary: "teaches the founder how to read and interpret profit and loss statements, balance sheets, breakeven analysis and quick ratio so they can manage the business by the numbers rather than by gut feel.",
    constraint: "the founder cannot confidently read their own financial statements, so they have no clear picture of profitability, liquidity or where the business is financially strong or weak.",
  },
  {
    id: "tools-to-predict-profit",
    name: "the tools to predict profit and cashflow",
    pillar: "savage margins",
    subPillar: "finance",
    tags: [
      "can't predict cash flow", "always surprised by the bank balance", "no budget",
      "no cash flow forecast", "don't know how much to spend on marketing",
      "can't plan hiring because don't know future cash position",
      "paper profit but no cash", "ato debt", "tax surprises", "not paying myself first",
      "don't know my true costs", "can't see problems coming",
    ],
    summary: "builds a 12-month budget and rolling cash flow forecast so the founder can see their true financial position, plan hiring and marketing spend, avoid tax surprises and stop being caught short.",
    constraint: "the founder has no forward-looking financial tools, so cash flow problems arrive without warning and decisions about spending, hiring and growth are made without a clear picture of what's coming.",
  },

  // savage margins — marketing
  {
    id: "what-business-are-you-in",
    name: "what business are you really in?",
    pillar: "savage margins",
    subPillar: "marketing",
    tags: [
      "everything to everyone", "too many services", "no clear focus", "scope creep",
      "doing work with thin margins", "can't define the ideal customer",
      "confused marketing message", "all things to all people", "not sure what to lead with",
      "doing jobs i don't really want to do", "no clear niche or focus",
      "marketing too broad", "not sure which service to push",
    ],
    summary: "clarifies exactly what the business is really selling by finding the overlap between what customers want, what the market needs, and what the founder does best — so marketing has a clear, focused message instead of trying to be everything.",
    constraint: "the founder doesn't have a clear enough definition of what business they are actually in, so marketing is unfocused, margins are uneven, and scope creep is constant.",
  },
  {
    id: "product-service-ecosystem",
    name: "creating your product / service ecosystem",
    pillar: "savage margins",
    subPillar: "marketing",
    tags: [
      "customers buy once and leave", "no repeat business", "no upsell strategy",
      "low lifetime value", "can't get people to buy more", "no product ladder",
      "don't know which product to lead with", "no entry level offer",
      "not capitalising on existing customers", "no customer ascension",
      "don't know the margin on each service", "products don't work together",
    ],
    summary: "maps every product and service into a structured ecosystem with clear entry points, ascension paths and margin awareness so customers come in, stay longer and buy more — rather than buying once and disappearing.",
    constraint: "the business has multiple products or services but no structured ecosystem, so lifetime value is low and the founder is not capitalising on the customers they already have.",
  },
  {
    id: "offers-that-convert",
    name: "offers that convert",
    pillar: "savage margins",
    subPillar: "marketing",
    tags: [
      "can't get leads in the door", "hard to convert cold traffic", "top of funnel not working",
      "no clear offer", "offer is too complicated", "too hard to buy from us",
      "no low-barrier entry offer", "scaling the wrong thing", "building around the wrong service",
      "no risk minimiser for the buyer", "offer doesn't convert",
    ],
    summary: "builds a high-margin, easy-to-buy entry offer that minimises risk for the customer and gets them into the ecosystem — using the product and market insight from earlier work to create something that actually converts.",
    constraint: "the founder doesn't have a clear, simple, low-risk offer that makes it easy for cold leads to say yes and enter the business for the first time.",
  },
  {
    id: "increase-share-of-wallet",
    name: "increase your share of wallet",
    pillar: "savage margins",
    subPillar: "marketing",
    tags: [
      "not sure if customers know all our services", "leaving money on the table with existing customers",
      "want to increase profit without more marketing spend", "low average order value",
      "customers only buying one thing", "not cross-selling", "not upselling",
      "want to get more from existing relationships", "low transaction frequency",
    ],
    summary: "maps every existing customer against every product and service to find the gaps, then builds a customised strategy to sell more to the people who already trust the business — without spending more on marketing.",
    constraint: "existing customers are not buying everything the business offers because no one has systematically identified the gaps and built a strategy to fill them.",
  },
  {
    id: "developing-marketing-plan",
    name: "developing your marketing plan",
    pillar: "savage margins",
    subPillar: "marketing",
    tags: [
      "no marketing strategy", "just doing ads", "marketing is just google or facebook",
      "not sure how to acquire customers profitably", "no marketing plan",
      "not measuring marketing results", "no content strategy", "no ideal customer defined",
      "marketing person doing whatever they want", "no clarity on marketing spend",
      "can't hold a marketing agency accountable", "don't know what's working",
    ],
    summary: "builds a comprehensive marketing strategy and executable plan — audience definition, positioning, channels, content calendar, advertising budget, SEO, email, and KPIs — so the founder can profitably acquire customers and hold whoever executes it accountable.",
    constraint: "the business has no structured marketing strategy, so spend is reactive, results are unmeasured, and the founder can't tell what is or isn't working.",
  },
  {
    id: "build-your-brand",
    name: "build your brand",
    pillar: "savage margins",
    subPillar: "marketing",
    tags: [
      "no brand strategy", "inconsistent look and feel", "brand not defined",
      "can't communicate what makes us different", "marketing doesn't reflect who we are",
      "can't brief a designer or agency properly", "no brand voice",
      "people don't trust us enough to pay premium prices", "no brand book",
      "brand feels generic", "marketing feels inconsistent", "no clear brand personality",
    ],
    summary: "builds a complete brand book — purpose, mission, values, personality, voice characteristics, colour psychology, logo usage, typography and imagery — so the business communicates a consistent, trustworthy identity that earns the right to charge premium prices.",
    constraint: "the business has no defined brand strategy, so marketing is inconsistent, trust is slow to build, and the founder can't brief anyone else to represent the business correctly.",
  },

  // savage margins — sales
  {
    id: "increasing-conversions",
    name: "increasing conversions",
    pillar: "savage margins",
    subPillar: "sales",
    tags: [
      "low conversion rate", "losing deals", "can't convert leads", "no sales process",
      "quoting but not winning", "leads coming in but not closing", "weak sales scripts",
      "no objection handling", "inconsistent sales approach", "no crm for sales tracking",
      "don't know conversion rate at each stage", "sales depends on the founder",
    ],
    summary: "builds the full sales engine — scripts, objection handling, CRM tracking, follow-up cadence and conversion metrics at every stage — so leads are worked properly and conversion improves without the founder needing to do the selling.",
    constraint: "leads are coming in but not converting at the rate they should because there is no structured, scripted, tracked sales process the team can follow consistently.",
  },
  {
    id: "consistently-making-profit",
    name: "consistently making profit",
    pillar: "savage margins",
    subPillar: "sales",
    tags: [
      "only i can sell", "no one sells like me", "sales team inconsistent",
      "no sales playbook", "sales team not on brand", "onboarding sales people is a mess",
      "keep training sales people from scratch", "sales performance up and down",
      "no bible for the sales team", "team not using the right language",
      "sales dependent on the founder", "can't scale sales without me",
    ],
    summary: "builds a detailed sales playbook — brand voice, pre-day workflow, scripts, tracking, KPIs, commission structure and product knowledge — so the sales function runs consistently to a standard without the founder being the only one who can close.",
    constraint: "the business cannot make profit consistently because the sales function depends entirely on the founder, and no playbook exists to replicate the result through a team.",
  },
];

const TRAINING_LIBRARY = [...TRAINING_LIBRARY_BASE, ...SAVAGE_MARGINS];

// ─── conversation logic ──────────────────────────────────────────────────────
const SYSTEM_PROMPT = `you are an exyt diagnostic tool. exyt installs operating systems into founder-led businesses doing $1m-$20m so the founder is no longer the structural dependency holding everything together.

exytOS™ is built on four pillars. installs are available across all four:

strategic core: purpose, mission, values, vision, annual goals, quarterly focus, team alignment.
seal team: leadership structure, founder behaviour, team culture, standards, retention, meeting cadence, kpi ownership.
slick operations: recruiting, onboarding, playbooks, team development, ops manager, customer journey, task management, process documentation, CRM and conversions.
savage margins: cash flow, pricing, financial management, marketing strategy, brand, sales process, conversion.

the founder already knows their constraint. your job is not to find it. it's to refine it. they'll name something like "i can't keep good people" or "margins are too thin." that's the starting point, not the answer.

ask 2-3 short questions to understand exactly where the constraint is showing up, what it looks like in practice, and what they've already tried. then recommend the single most relevant install.

rules:
- sound like a calm, experienced operator. not a coach, not a chatbot.
- never use hype language. no: unlock, transform, ignite, scalable, future-proof, challenge, pain point.
- never ask more than one question at a time.
- questions should be short and direct. one sentence, maximum.
- you are refining what they already know, not interrogating them.
- do not recommend until you have enough to be specific. minimum 2 exchanges after their opening.
- when you recommend, name the install exactly as given. name the pillar. if the pillar has a sub-pillar, include it. explain in one sentence why it fits their situation specifically. reference what they actually said.
- keep every message under 60 words.
- everything lowercase.
- never mention any person's name.
- do not ask if they want to continue. just ask the next refining question.
- use "install" not "training", "program", or "course".
- use "constraint" not "challenge" or "pain point".
- use "structure" or "structural" not "systems" on its own.
- tone: a conversation over coffee. calm. no performance, no pitch.

if the founder names two constraints that are genuinely disconnected — e.g. a team problem and a cash flow problem — do not try to serve both. instead, ask them which one is the more pressing constraint right now. one short question. wait for their answer before continuing. only proceed once there is a single constraint to work with.

when you have enough (after 2-3 refining exchanges), recommend the installs that directly address the constraint. 2 is the default. only recommend 3 if there is a genuinely distinct third constraint that the first two don't cover. never pad to 3. the order matters — be directive about what to do first and why.

output your recommendations in this exact format, repeating the block for each install (2 or 3 total):
RECOMMENDATION: [install name, exactly as given]
PILLAR: [pillar name]
SUB: [sub-pillar if one exists, otherwise write none]
REASON: [one sentence specific to what they said]
ORDER: [1, 2, or 3]
DIRECTIVE: [one short sentence — e.g. "start here." or "once that's in place, move to this." or "this runs alongside the first."]

available installs:
${TRAINING_LIBRARY.map(t => `- "${t.name}" (${t.pillar}${t.subPillar ? ` / ${t.subPillar}` : ""}): ${t.summary} addresses: ${t.constraint}`).join("\n")}`;

const OPENING_MESSAGE = {
  role: "assistant",
  content: "what's the constraint? name it roughly. we'll sharpen it from there.",
};

// ─── styles ──────────────────────────────────────────────────────────────────
const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Noto+Sans:wght@300;400;500;600;700&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --navy:        #051b6d;
    --navy-deep:   #030f42;
    --navy-mid:    #0a2580;
    --navy-light:  #0d2e99;
    --cyan:        #3bf4fc;
    --cyan-dim:    rgba(59,244,252,0.15);
    --cyan-faint:  rgba(59,244,252,0.06);
    --white:       #ffffff;
    --grey-light:  #f6f6f6;
    --grey-mid:    #d0d8e8;
    --grey-dim:    rgba(255,255,255,0.35);
    --grey-faint:  rgba(255,255,255,0.08);
    --border:      rgba(255,255,255,0.1);
    --border-dim:  rgba(255,255,255,0.06);
    --text:        #ffffff;
    --text-muted:  rgba(255,255,255,0.55);
    --text-dim:    rgba(255,255,255,0.2);
  }

  body {
    background: var(--navy);
    color: var(--text);
    font-family: 'Noto Sans', sans-serif;
    font-size: 14px;
    line-height: 1.7;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .shell {
    width: 100%;
    max-width: 900px;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    padding: 0 48px;
  }

  @media (max-width: 600px) {
    .shell { padding: 0 16px; }
  }

  .header {
    padding: 40px 0 32px;
    border-bottom: 1px solid var(--border);
  }

  .wordmark {
    display: flex;
    align-items: center;
    gap: 14px;
  }

  .logo {
    height: 28px;
    width: auto;
    mix-blend-mode: screen;
    display: block;
  }

  .header-title {
    font-family: 'Noto Sans', sans-serif;
    font-size: 12px;
    font-weight: 500;
    letter-spacing: 0.1em;
    color: var(--text-muted);
    border-left: 1px solid var(--border);
    padding-left: 14px;
  }

  .lede {
    padding: 28px 0 0;
    color: var(--text-muted);
    font-size: 13px;
    font-weight: 300;
    line-height: 1.75;
  }

  .lede em {
    font-style: normal;
    color: var(--cyan);
    font-weight: 500;
  }

  .conversation {
    flex: 1;
    padding: 32px 0;
    display: flex;
    flex-direction: column;
  }

  .msg-wrap {
    display: flex;
    flex-direction: column;
    margin-bottom: 28px;
    animation: fadein 0.3s ease both;
  }

  @keyframes fadein {
    from { opacity: 0; transform: translateY(5px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  .msg-label {
    font-size: 10px;
    font-weight: 600;
    letter-spacing: 0.12em;
    color: var(--text-dim);
    margin-bottom: 6px;
  }

  .msg-label.user {
    color: rgba(59,244,252,0.4);
    text-align: right;
  }

  .msg-wrap.user-wrap {
    align-items: flex-end;
  }

  .msg-bubble {
    padding: 14px 18px;
    font-size: 14px;
    font-weight: 300;
    line-height: 1.75;
    color: var(--text);
    max-width: 88%;
    position: relative;
  }

  .msg-bubble.assistant {
    background: rgba(255,255,255,0.06);
    border: 1px solid var(--border);
    border-radius: 4px 18px 18px 18px;
    align-self: flex-start;
  }

  .msg-bubble.user {
    background: var(--navy-deep);
    border: 1px solid rgba(59,244,252,0.2);
    border-radius: 18px 4px 18px 18px;
    color: var(--grey-mid);
    align-self: flex-end;
  }

  .recommendations-list {
    display: flex;
    flex-direction: column;
    gap: 12px;
    width: 100%;
  }

  .recommendation-card {
    background: var(--navy-deep);
    border: 1px solid var(--cyan);
    border-radius: 3px;
    padding: 20px 24px;
  }

  .rec-order-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 12px;
  }

  .rec-order {
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 0.12em;
    color: var(--navy);
    background: var(--cyan);
    padding: 3px 10px;
    border-radius: 2px;
  }

  .rec-eyebrow {
    font-size: 10px;
    font-weight: 600;
    letter-spacing: 0.14em;
    color: var(--text-dim);
  }

  .rec-name {
    font-family: 'Noto Sans', sans-serif;
    font-size: 18px;
    font-weight: 700;
    color: var(--white);
    margin-bottom: 6px;
    line-height: 1.3;
  }

  .rec-pillar {
    font-size: 11px;
    font-weight: 500;
    letter-spacing: 0.06em;
    color: var(--text-muted);
    margin-bottom: 2px;
  }

  .rec-divider {
    width: 24px;
    height: 1px;
    background: var(--cyan);
    opacity: 0.3;
    margin: 14px 0;
  }

  .rec-reason {
    font-size: 13px;
    font-weight: 300;
    color: var(--text-muted);
    line-height: 1.7;
  }

  .rec-directive {
    margin-top: 10px;
    font-size: 12px;
    font-weight: 600;
    color: var(--cyan);
    letter-spacing: 0.02em;
  }

  .input-area {
    padding: 20px 0 40px;
    border-top: 1px solid var(--border);
    display: flex;
    flex-direction: column;
    gap: 10px;
    position: sticky;
    bottom: 0;
    background: var(--navy);
  }

  .input-row {
    display: flex;
    gap: 10px;
    align-items: flex-end;
  }

  textarea {
    flex: 1;
    background: rgba(255,255,255,0.05);
    border: 1px solid var(--border);
    border-radius: 3px;
    color: var(--text);
    font-family: 'Noto Sans', sans-serif;
    font-size: 13px;
    font-weight: 300;
    line-height: 1.65;
    padding: 12px 14px;
    resize: none;
    outline: none;
    min-height: 44px;
    max-height: 140px;
    transition: border-color 0.2s;
  }

  textarea::placeholder { color: var(--text-dim); }
  textarea:focus { border-color: rgba(59,244,252,0.4); }

  button.send {
    background: var(--cyan);
    border: none;
    border-radius: 3px;
    color: var(--navy);
    font-family: 'Noto Sans', sans-serif;
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.1em;
    padding: 10px 18px;
    cursor: pointer;
    white-space: nowrap;
    transition: opacity 0.2s;
    height: 44px;
    align-self: flex-end;
  }

  button.send:hover:not(:disabled) { opacity: 0.85; }

  button.send:disabled {
    opacity: 0.25;
    cursor: not-allowed;
  }

  .thinking {
    display: flex;
    gap: 5px;
    align-items: center;
    padding: 4px 0 0 2px;
  }

  .dot {
    width: 4px;
    height: 4px;
    background: var(--cyan);
    border-radius: 50%;
    animation: pulse 1.4s ease-in-out infinite;
  }

  .dot:nth-child(2) { animation-delay: 0.2s; }
  .dot:nth-child(3) { animation-delay: 0.4s; }

  @keyframes pulse {
    0%, 80%, 100% { opacity: 0.15; transform: scale(0.8); }
    40% { opacity: 1; transform: scale(1); }
  }

  .restart-btn {
    background: none;
    border: 1px solid var(--border);
    border-radius: 3px;
    color: var(--text-muted);
    font-family: 'Noto Sans', sans-serif;
    font-size: 11px;
    font-weight: 500;
    letter-spacing: 0.08em;
    padding: 8px 14px;
    cursor: pointer;
    align-self: flex-start;
    transition: color 0.2s, border-color 0.2s;
    margin-top: 2px;
  }

  .restart-btn:hover {
    color: var(--cyan);
    border-color: rgba(59,244,252,0.4);
  }

  .hint {
    font-size: 10px;
    font-weight: 400;
    color: var(--text-dim);
    letter-spacing: 0.04em;
    padding-top: 2px;
  }
`;

// ─── parse recommendation from model response ────────────────────────────────
function parseRecommendation(text) {
  // split on RECOMMENDATION: to find each block
  const blocks = text.split(/(?=RECOMMENDATION:)/i).filter(b => b.trim());
  const results = [];
  for (const block of blocks) {
    const recMatch   = block.match(/RECOMMENDATION:\s*(.+)/i);
    const pillarMatch = block.match(/PILLAR:\s*(.+)/i);
    const subMatch   = block.match(/SUB:\s*(.+)/i);
    const reasonMatch = block.match(/REASON:\s*(.+)/i);
    const orderMatch  = block.match(/ORDER:\s*(\d)/i);
    const dirMatch    = block.match(/DIRECTIVE:\s*(.+)/i);
    if (recMatch && reasonMatch) {
      results.push({
        name:      recMatch[1].trim(),
        pillar:    pillarMatch  ? pillarMatch[1].trim()  : null,
        sub:       subMatch     ? subMatch[1].trim()     : null,
        reason:    reasonMatch[1].trim(),
        order:     orderMatch   ? parseInt(orderMatch[1]) : results.length + 1,
        directive: dirMatch     ? dirMatch[1].trim()     : null,
      });
    }
  }
  return results.length > 0 ? results : null;
}

// ─── component ───────────────────────────────────────────────────────────────
export default function ExytRecommender() {
  const [messages, setMessages] = useState([OPENING_MESSAGE]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [recommendation, setRecommendation] = useState(null);
  const bottomRef = useRef(null);
  const textareaRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  };

  const send = async () => {
    const text = input.trim();
    if (!text || loading || recommendation) return;

    const userMsg = { role: "user", content: text };
    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);
    setInput("");
    setLoading(true);

    try {
      const apiMessages = updatedMessages.map((m) => ({
        role: m.role,
        content: m.content,
      }));

      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          system: SYSTEM_PROMPT,
          messages: apiMessages,
        }),
      });

      const data = await res.json();
      const reply = data.content?.map((b) => b.text || "").join("") || "";

      const rec = parseRecommendation(reply);

      if (rec) {
        // strip the structured part from the visible message
        const cleaned = reply
          .replace(/RECOMMENDATION:.*$/im, "")
          .replace(/PILLAR:.*$/im, "")
          .replace(/SUB:.*$/im, "")
          .replace(/REASON:.*$/im, "")
          .replace(/ORDER:.*$/im, "")
          .replace(/DIRECTIVE:.*$/im, "")
          .trim();

        const bridges = [
          "based on what you've described, here's where to start.",
          "here's what the work looks like from here.",
          "this is what needs to happen. in this order.",
          "here's what i'd put in front of you right now.",
          "clear enough. here's the path.",
          "here's where to focus. start at the top.",
          "this is what moves the needle on what you've described.",
          "based on that, here's the install sequence.",
        ];
        const bridge = bridges[Math.floor(Math.random() * bridges.length)];
        setMessages((prev) => [...prev, { role: "assistant", content: bridge }]);
        setRecommendation(rec);
      } else {
        setMessages((prev) => [...prev, { role: "assistant", content: reply.toLowerCase() }]);
      }
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "something went wrong on our end. try sending that again.",
        },
      ]);
    }

    setLoading(false);
  };

  const restart = () => {
    setMessages([OPENING_MESSAGE]);
    setInput("");
    setRecommendation(null);
  };

  return (
    <>
      <style>{styles}</style>
      <div className="shell">
        <div className="header">
          <div className="wordmark">
            <img src="data:image/png;base64,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" alt="exyt" className="logo" />
            <span className="header-title">the install finder.</span>
          </div>
        </div>

        <p className="lede">
          name your constraint. we'll sharpen it. then point you at the <em>specific</em> install that addresses it.
        </p>

        <div className="conversation">
          {messages.map((m, i) => (
            <div key={i} className={`msg-wrap ${m.role === "user" ? "user-wrap" : ""}`}>
              <div className={`msg-label ${m.role}`}>
                {m.role === "assistant" ? "exyt" : "you"}
              </div>
              <div className={`msg-bubble ${m.role}`}>{m.content}</div>
            </div>
          ))}

          {recommendation && (
            <div className="msg-wrap">
              <div className="msg-label">install recommendation</div>
              <div className="recommendations-list">
                {recommendation.map((rec, i) => (
                  <div key={i} className="recommendation-card">
                    <div className="rec-order-row">
                      <span className="rec-order">{rec.order === 1 ? "start here" : rec.order === 2 ? "then this" : "alongside"}</span>
                      <span className="rec-eyebrow">exyt install</span>
                    </div>
                    <div className="rec-name">{rec.name}</div>
                    {rec.pillar && (
                      <div className="rec-pillar">
                        {rec.pillar}
                        {rec.sub && rec.sub.toLowerCase() !== "none" ? ` — ${rec.sub}` : ""}
                      </div>
                    )}
                    <div className="rec-divider" />
                    <div className="rec-reason">{rec.reason}</div>
                    {rec.directive && (
                      <div className="rec-directive">{rec.directive}</div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {loading && (
            <div className="msg-wrap">
              <div className="msg-label">exyt</div>
              <div className="thinking">
                <div className="dot" />
                <div className="dot" />
                <div className="dot" />
              </div>
            </div>
          )}

          <div ref={bottomRef} />
        </div>

        <div className="input-area">
          {recommendation ? (
            <button className="restart-btn" onClick={restart}>
              start over
            </button>
          ) : (
            <>
              <div className="input-row">
                <textarea
                  ref={textareaRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="your answer..."
                  disabled={loading}
                  rows={1}
                />
                <button
                  className="send"
                  onClick={send}
                  disabled={loading || !input.trim()}
                >
                  send →
                </button>
              </div>
              <div className="hint">enter to send. shift + enter for a new line.</div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
