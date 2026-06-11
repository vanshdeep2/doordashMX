// Extracted from dd-agent.html and dd-teamlead.html
export const AGENT_ORDER = [
  'ayanda-mbeki', 'busisiwe-maseko', 'janine-jacobs', 'lerato-nkosi', 'michael-naidoo',
  'nomsa-dlamini', 'pieter-botha', 'sipho-khumalo', 'thabo-van-der-merwe', 'zanele-ndlovu',
]

export const AGENTS = {
  'ayanda-mbeki': {
    name: 'Ayanda Mbeki', role: 'Support Agent', team: 'Kagiso de Villiers',
    qa_w5: 95.7, qa_w1: 55.7, pa: 100.0, rr: 97.8, cf: 0,
    qa_series: [55.7, 56.5, 54.7, 94.9, 95.7], status: 'On Track',
    insight: 'Ayanda demonstrated exceptional process adherence and resolution rates this week, with nearly all calls resolved on first contact and high predicted CSAT. While technical troubleshooting is exemplary, explicit empathy and emotional acknowledgement remain the development area.',
    coaching: [
      { topic: 'Empathy and Emotional Acknowledgement', type: 'development',
        content: 'Ayanda, your troubleshooting this week has been outstanding - merchants are getting their issues resolved efficiently and your process adherence is at 100%. That is something to be genuinely proud of. The next step to take your already strong performance even further is adding an explicit acknowledgement before you move into the solution. When a merchant signals urgency, a single sentence like \'I completely understand how important this is - I am on it right now\' sets a warmer tone for everything that follows. Your technical skills are already there - this one shift will make the merchant experience feel as good as the outcome.',
        evidence: 'Merchant: "We need to know if we can receive orders today." - the urgency was not explicitly acknowledged before troubleshooting began.',
        lms: 'Empathy in High-Pressure Interactions' },
      { topic: 'Best Practice - T1 Resolution and Process Adherence', type: 'strength',
        content: 'Your structured approach to store status and reactivation calls is being recognised as a best practice for the whole team. The way you work through the checklist - status, visibility, order protocol, connectivity - before consulting the matrix is exactly the standard we want everyone following. Kagiso is sharing your method with your colleagues this week as the benchmark approach. Keep it up - you are setting the bar.',
        evidence: '"I have checked current status, listing visibility, order protocol, and connectivity. Now checking the reactivation matrix for eligibility." - this is the benchmark approach.',
        lms: null }
    ],
    notes: [
      { from: 'Kagiso de Villiers', role: 'Team Lead', date: '2026-05-20', message: 'Ayanda - your improvement since week 3 has been outstanding. QA score up from 55.7 to 95.7. The one focus area for the next two weeks is adding explicit empathy at the start of calls before you move into troubleshooting. See the coaching module above.' },
      { from: 'Ayanda Mbeki', role: 'Agent', date: '2026-05-21', message: 'Thank you Kagiso. I have reviewed the empathy coaching and will work on acknowledging the merchant situation before jumping into the checklist. Will apply from tomorrow.' },
      { from: 'Kagiso de Villiers', role: 'Team Lead', date: '2026-05-28', message: 'Checked your calls from this week - good improvement on the acknowledgement. Keep it going.' }
    ]
  },
  'busisiwe-maseko': {
    name: 'Busisiwe Maseko', role: 'Support Agent', team: 'Kagiso de Villiers',
    qa_w5: 86.0, qa_w1: 80.3, pa: 31.1, rr: 48.9, cf: 0,
    qa_series: [80.3, 75.3, 90.4, 87.6, 86.0], status: 'Action Needed',
    insight: 'Busisiwe demonstrated strong technical troubleshooting and professionalism, consistently resolving store visibility and device connectivity issues. Process adherence gaps in identity verification and closing recaps need structured support to close - new agent profile means these are addressable with the right coaching.',
    coaching: [
      { topic: 'Identity Verification Protocol', type: 'development',
        content: 'Busisiwe, merchants genuinely respond well to you - your warmth and professionalism come through clearly in your calls. You are settling into the role well and your improvement week on week is real and visible. The area we want to focus on together right now is making sure the full identity verification steps are completed at the start of every call before you take any action on the account. Your peer Janine has this down to a smooth routine and has agreed to walk you through her approach in a session this week - it will make a big difference to your process scores and you will feel more confident on the calls too.',
        evidence: 'Agent: "Can I start with your store name and store ID?" - full verification protocol was not followed.',
        lms: 'Merchant Identity Verification - Approved Methods' },
      { topic: 'Closing Recap Protocol', type: 'development',
        content: 'You are resolving calls well - merchants are getting answers. The next thing to practise is closing each call with a personalised recap: what the issue was, what you did, what the merchant should expect, and when. It takes about 30 seconds and it is the difference between a good call and a great one. Try writing the four elements on a sticky note next to your screen and work through them on every close this week. You will see the difference in your quality scores quickly.',
        evidence: 'Closing recaps were missing or too generic across multiple calls this week.',
        lms: 'Closing the Loop - Best Practice Guide' }
    ],
    notes: [
      { from: 'Kagiso de Villiers', role: 'Team Lead', date: '2026-05-20', message: 'Busisiwe - your technical troubleshooting is strong and merchants respond well to your communication style. Two areas to focus on: verification protocol and closing recaps. I have arranged a peer session with Janine for Thursday - please confirm you can make it.' },
      { from: 'Busisiwe Maseko', role: 'Agent', date: '2026-05-20', message: 'Confirmed for Thursday. I will review the verification module before the session.' },
      { from: 'Kagiso de Villiers', role: 'Team Lead', date: '2026-05-27', message: 'Checked your calls post peer session - verification is improving. Closing recaps still need work. Let us review together on Monday.' }
    ]
  },
  'janine-jacobs': {
    name: 'Janine Jacobs', role: 'Support Agent', team: 'Kagiso de Villiers',
    qa_w5: 100.0, qa_w1: 79.2, pa: 100.0, rr: 95.6, cf: 0,
    qa_series: [79.2, 73.0, 99.6, 100.0, 100.0], status: 'On Track',
    insight: 'Janine delivered exceptional performance this week - perfect process adherence, perfect CSAT, strong resolution rate. Her structured verification and ownership approach is being used as a best practice reference for the team. The only development area is adding more explicit empathy statements in otherwise strong interactions.',
    coaching: [
      { topic: 'Explicit Empathy in Strong Interactions', type: 'development',
        content: 'Janine, your performance this week is the benchmark for the team - perfect process adherence, perfect quality score, strong resolution rate. You should feel genuinely proud of where you are. The one thing that can take you from excellent to exceptional is making your empathy statements more personal to the situation. Rather than a general acknowledgement, try naming the merchant\'s specific experience: \'I know being locked out of your account when you are trying to run your business is really stressful - I am going to sort this for you right now.\' Your calls are already strong - this is just the finishing touch.',
        evidence: '"I can help. For security, I will use the approved alternative verification path." - technically perfect but the empathy statement before it is missing.',
        lms: 'Advanced Empathy - Taking Strong Interactions to Excellent' },
      { topic: 'Best Practice - Verification and Ownership', type: 'strength',
        content: 'You are being used this week as the peer coaching reference for verification and closing protocols - and rightly so. The way you complete verification, trigger the recovery flow, confirm the case number, set timing expectations, and close with a personalised recap is exactly the HQRR standard in action. This is the level we are helping others reach.',
        evidence: '"Verification is complete. I have triggered the approved recovery flow and documented the security check in case MX-XXXXX. You will receive confirmation within 15 minutes."',
        lms: null }
    ],
    notes: [
      { from: 'Kagiso de Villiers', role: 'Team Lead', date: '2026-05-20', message: 'Janine - perfect scores again this week. You are the benchmark for the team. I have asked you to peer coach Busisiwe on Thursday on verification - thank you for agreeing. One small development note: try adding a more explicit empathy statement before jumping into the verification steps.' },
      { from: 'Janine Jacobs', role: 'Agent', date: '2026-05-21', message: 'Happy to do the peer session with Busisiwe. And noted on the empathy - I will work on framing it more explicitly at the start.' }
    ]
  },
  'lerato-nkosi': {
    name: 'Lerato Nkosi', role: 'Support Agent', team: 'Kagiso de Villiers',
    qa_w5: 85.0, qa_w1: 72.2, pa: 17.8, rr: 0.0, cf: 1,
    qa_series: [72.2, 75.4, 72.6, 83.6, 85.0], status: 'Action Needed',
    insight: 'Lerato demonstrated strong communication and professionalism, consistently ensuring merchants understood the permanent consequences of deactivation requests. However, process adherence is critically low at 17.8% due to missed identity verification and incomplete workflow steps. Resolution rate is zero - all contacts were escalated or unresolved at T1 level.',
    coaching: [
      { topic: 'Identity Verification - Mandatory First Step', type: 'development',
        content: 'Lerato, your communication with merchants is a genuine strength - they leave calls feeling informed and respected. That matters a lot and it is something not everyone gets right naturally. The area we need to work on together urgently is completing the identity verification steps before anything else happens on the call - including for deactivation requests. Before our session on Wednesday please complete the verification module in the LMS. Once this becomes automatic for you, your process scores will start reflecting the communication quality you are already delivering.',
        evidence: '"I need to let you know this action is permanent and cannot be undone." - correct deactivation warning, but verification had not been completed before this step.',
        lms: 'Merchant Identity Verification - Mandatory Steps' },
      { topic: 'Deactivation Workflow Completion', type: 'development',
        content: 'The permanent deactivation process is one of the most important workflows we handle - a merchant\'s business presence on DoorDash is on the line. You have shown you understand the consequences and communicate them clearly to merchants. What we need to strengthen is making sure every step of the workflow is completed in order - particularly the irreversibility warning and the intent confirmation before proceeding. Let us go through this together on Wednesday and make sure you feel fully confident with it.',
        evidence: 'Critical failure week 2: merchant was permanently deactivated and told they could restart - this was incorrect. The workflow must be followed in full.',
        lms: 'Permanent Deactivation - Complete Workflow Guide' }
    ],
    notes: [
      { from: 'Kagiso de Villiers', role: 'Team Lead', date: '2026-05-20', message: 'Lerato - your communication and professionalism are strong. The critical issue is process adherence at 17.8% and zero resolution rate. I need us to meet this week for a structured review. Please complete both LMS modules before we meet on Wednesday.' },
      { from: 'Lerato Nkosi', role: 'Agent', date: '2026-05-21', message: 'Understood. I will complete the modules before Wednesday. I know the verification step has been an issue - I will focus on this.' },
      { from: 'Kagiso de Villiers', role: 'Team Lead', date: '2026-05-27', message: 'Good session on Wednesday. PA improving from last week. Keep the verification checklist open on your screen for every call until it becomes automatic.' }
    ]
  },
  'michael-naidoo': {
    name: 'Michael Naidoo', role: 'Support Agent', team: 'Kagiso de Villiers',
    qa_w5: 99.9, qa_w1: 99.9, pa: 88.9, rr: 4.4, cf: 0,
    qa_series: [99.9, 100.0, 99.5, 99.9, 99.9], status: 'Benchmark',
    insight: 'Michael demonstrated exceptional professionalism, process adherence, and communication throughout all 5 weeks. His approach is the benchmark for the team. Low resolution rate reflects process dependencies on specialist teams - not agent performance. The only development opportunity is adding more personalised empathy beyond standard statements.',
    coaching: [
      { topic: 'Personalised Empathy Beyond Standard Statements', type: 'development',
        content: 'Michael, five weeks of benchmark performance. Genuinely impressive and the team knows it. The quality cluster has flagged one small development opportunity - personalising your empathy statements to the specific merchant situation rather than using standard phrases. You are already empathetic - the shift is subtle. Instead of \'I completely understand\', try \'I can see how disruptive this payment delay is for your operation - let me make sure we resolve this before we close.\' Small change from an already high baseline, but it is what separates 97 from 100.',
        evidence: '"I completely understand." - technically empathetic but generic. Personalised to the specific merchant situation would score higher.',
        lms: null },
      { topic: 'Best Practice - Full Team Benchmark', type: 'strength',
        content: 'Your approach across all call types is the standard Kagiso holds the team to. Your documentation is thorough, your escalation judgement is sound, your closings are clear, and your merchants consistently feel well served. You are also supporting your colleagues through peer coaching this week - that is exactly the kind of contribution that raises the whole team\'s performance. Keep doing what you are doing.',
        evidence: '"Expected timing is 2 to 3 business days unless the specialist team contacts you sooner." - clear, accurate, complete expectation setting.',
        lms: null }
    ],
    notes: [
      { from: 'Kagiso de Villiers', role: 'Team Lead', date: '2026-05-20', message: 'Michael - another perfect week. Your work is the standard I hold the team to. One small note from the quality cluster: try personalising empathy statements to the specific merchant situation rather than standard phrases. Otherwise keep doing exactly what you are doing.' },
      { from: 'Michael Naidoo', role: 'Agent', date: '2026-05-21', message: 'Noted on the empathy personalisation. Will make that adjustment.' }
    ]
  },
  'nomsa-dlamini': {
    name: 'Nomsa Dlamini', role: 'Support Agent', team: 'Kagiso de Villiers',
    qa_w5: 96.8, qa_w1: 75.8, pa: 71.1, rr: 53.3, cf: 0,
    qa_series: [75.8, 71.9, 73.4, 97.0, 96.8], status: 'On Track',
    insight: 'Nomsa demonstrated strong process ownership, professionalism, and communication clarity this week, with above-average behaviour scores. Process adherence gaps remain in identity verification and store status troubleshooting steps. The phantom resolution pattern from weeks 1-3 has been eliminated - confirmation IDs are now being read back consistently.',
    coaching: [
      { topic: 'Identity Verification Completion', type: 'development',
        content: 'Nomsa, the improvement in your payment resolution this period has been outstanding - the repeat contact pattern from weeks 1 and 2 is completely gone and that is down to your effort and focus. Really well done. The one remaining area to tighten up is completing the full identity verification at the start of calls, particularly on store status contacts. You are doing it on payment calls now - let us make it consistent across everything. Complete the checklist every time before touching the account and your process adherence score will follow.',
        evidence: 'No evidence of explicit merchant identity verification on several store status calls this week.',
        lms: 'Merchant Identity Verification - Approved Methods' },
      { topic: 'Strength - Payment Resolution Protocol', type: 'strength',
        content: 'The confirmation ID protocol you have adopted on payment calls is exactly what was needed and it is showing in the data. Merchants are calling back far less and your quality scores have improved significantly. This is a direct result of the work you put in - take a moment to recognise that. The standard you are now holding on payment calls is the one we want across all your call types.',
        evidence: '"The confirmation ID is MPA-406646. Expected timing is 2 to 3 business days, and I have added the details and next steps to the case notes." - this is exactly the standard.',
        lms: null }
    ],
    notes: [
      { from: 'Kagiso de Villiers', role: 'Team Lead', date: '2026-05-20', message: 'Nomsa - the payment resolution improvement is excellent. No repeat contacts in weeks 4 or 5. The one remaining focus is verification on store status calls - complete the full checklist every time.' },
      { from: 'Nomsa Dlamini', role: 'Agent', date: '2026-05-21', message: 'Understood. I will make sure verification is the first step on every call going forward.' }
    ]
  },
  'pieter-botha': {
    name: 'Pieter Botha', role: 'Support Agent', team: 'Kagiso de Villiers',
    qa_w5: 94.8, qa_w1: 31.7, pa: 88.9, rr: 0.0, cf: 80,
    qa_series: [31.7, 31.1, 32.2, 94.9, 94.8], status: 'On Track',
    insight: 'Pieter demonstrated strong process adherence and professionalism in weeks 4-5, with a 63-point quality score improvement since week 1. Critical failures dropped from 24-28 per week to zero following coaching. The remaining development areas are jargon reduction and empathy during merchant confusion.',
    coaching: [
      { topic: 'Plain Language - No Internal Jargon', type: 'development',
        content: 'Pieter, the transformation in your quality scores over the past two weeks is one of the most significant improvements on the team this period - from 31.7 to 94.8. That does not happen without real effort and real change, and it deserves recognition. The area to keep building on is plain language - particularly with compliance and account change calls where technical terms can easily confuse merchants. When you use a term like Tax ID or Legal Entity, follow it immediately with a plain explanation. The reference card you have put next to your screen is the right approach - keep using it.',
        evidence: 'Merchant: "I do not know those terms." - jargon was used without explanation.',
        lms: 'Plain Language Communication for Merchants' },
      { topic: 'Empathy During Merchant Confusion', type: 'development',
        content: 'When a merchant is confused or frustrated, a short acknowledgement before you continue goes a long way - \'I can see this process feels complicated, let me walk you through it step by step.\' The weeks 1 and 2 data showed what happens without it. Weeks 4 and 5 show you have made the shift. This coaching is here to reinforce the progress you have already made, not to flag a problem. You are on the right track.',
        evidence: 'Agent did not express empathy or acknowledge merchant frustration during account change calls in weeks 1-3.',
        lms: 'Empathy in Compliance and Account Change Interactions' }
    ],
    notes: [
      { from: 'Kagiso de Villiers', role: 'Team Lead', date: '2026-05-20', message: 'Pieter - the improvement since week 3 is exceptional. 63 points up on quality score and zero critical failures in weeks 4 and 5. The focus now is maintaining this and continuing to work on plain language and empathy. You have shown you can do it.' },
      { from: 'Pieter Botha', role: 'Agent', date: '2026-05-21', message: 'Thank you. The coaching on jargon was very helpful. I have a reference card next to my screen now with plain language alternatives for all the compliance terms.' },
      { from: 'Kagiso de Villiers', role: 'Team Lead', date: '2026-05-28', message: 'Good to hear. Keep the reference card - it is working.' }
    ]
  },
  'sipho-khumalo': {
    name: 'Sipho Khumalo', role: 'Support Agent', team: 'Kagiso de Villiers',
    qa_w5: 96.9, qa_w1: 44.3, pa: 100.0, rr: 24.4, cf: 0,
    qa_series: [44.3, 100.0, 45.2, 100.0, 96.9], status: 'Watch',
    insight: 'Sipho demonstrated strong process adherence (100%) and professionalism this week, correctly following legal escalation protocols on all contacts. Low resolution rate reflects the nature of legal and compliance contacts - not agent performance. The development area is adding explicit empathy and de-escalation during high-stress legal interactions.',
    coaching: [
      { topic: 'Empathy in High-Stress Legal Interactions', type: 'development',
        content: 'Sipho, when you are on your game with legal escalations - weeks 2 and 4 show this clearly - you handle them with professionalism and confidence. The merchant feels supported even when you cannot resolve the issue yourself. The focus for this week is adding an explicit acknowledgement before the escalation: \'I understand this is a stressful situation and I want to make sure you are fully supported - I am escalating this to our specialist team right now and they will be in touch within [timeframe].\' That one sentence reduces tension and improves how the escalation lands for the merchant.',
        evidence: 'Agent did not explicitly acknowledge or address the merchant frustration or threat of legal action before escalating.',
        lms: 'De-escalation in Legal and Compliance Contacts' },
      { topic: 'Consistency - Legal Escalation Protocol', type: 'development',
        content: 'Your good weeks are genuinely strong - and that is actually the most important point here. You know the protocol. You apply it well when you are in the zone. The focus now is making that performance consistent regardless of how the call starts. The pattern in weeks 1, 3, and 5 shows that high-pressure contacts are the ones that throw you off. Let us talk on Thursday about what is happening in those moments - because the version of you that handled week 4 calls is the standard, and it is fully achievable every week.',
        evidence: 'Week 1 and 3: attempted to answer legal questions directly. Week 2 and 4: correct immediate escalation. The difference is consistency of protocol application.',
        lms: 'Legal and HSL Escalation - Required Protocol' }
    ],
    notes: [
      { from: 'Kagiso de Villiers', role: 'Team Lead', date: '2026-05-20', message: 'Sipho - week 4 was strong. Week 5 is a slight dip. The inconsistency pattern needs to be resolved - you clearly know the protocol because you apply it perfectly in good weeks. Let us talk about what causes the variation. Can we meet Thursday?' },
      { from: 'Sipho Khumalo', role: 'Agent', date: '2026-05-21', message: 'Thursday works. I think the issue is the high-stress calls throw me off the protocol. Will think about it before we meet.' },
      { from: 'Kagiso de Villiers', role: 'Team Lead', date: '2026-05-28', message: 'Good session Thursday. The de-escalation coaching should help. Focus on the acknowledgement step before escalating - that is the one you are dropping under pressure.' }
    ]
  },
  'thabo-van-der-merwe': {
    name: 'Thabo van der Merwe', role: 'Support Agent', team: 'Kagiso de Villiers',
    qa_w5: 97.2, qa_w1: 99.8, pa: 100.0, rr: 46.7, cf: 0,
    qa_series: [99.8, 99.7, 99.5, 98.1, 97.2], status: 'Watch',
    insight: 'Thabo demonstrated strong process adherence and professionalism, achieving perfect process adherence (100%). Quality score is slightly down from week 1 (99.8 to 97.2) - a small downward drift to monitor. AHT has improved following coaching. The remaining development area is explicit empathy, and resolution rate is constrained by backend processing dependencies.',
    coaching: [
      { topic: 'Explicit Empathy in Merchant Interactions', type: 'development',
        content: 'Thabo, your process adherence is at 100% and your documentation is some of the cleanest on the team. Merchants are getting accurate, thorough service from you every time. The quality cluster has identified one opportunity to build on - adding an empathy statement when you are setting timeline expectations on payment and account calls. When a merchant is waiting on a backend process, something like \'I know waiting a couple of days for a payment resolution is not ideal - I have made sure everything is correctly documented on our side so there are no delays\' keeps their confidence high even when you cannot resolve immediately. Small addition to an already strong foundation.',
        evidence: '"I will verify the store and silently check the policy and Diagnostic Tool while I work through this." - technically excellent but no empathy statement.',
        lms: 'Empathy in Payment and Backend-Dependent Contacts' }
    ],
    notes: [
      { from: 'Kagiso de Villiers', role: 'Team Lead', date: '2026-05-20', message: 'Thabo - AHT improvement is noted and appreciated. Quality score is very slightly down from your usual standard. The quality cluster flags empathy as the gap. One small adjustment: add an empathy statement when you are setting timeline expectations on payment calls.' },
      { from: 'Thabo van der Merwe', role: 'Agent', date: '2026-05-21', message: 'Understood. I will add the empathy framing around the timeline setting. Makes sense.' }
    ]
  },
  'zanele-ndlovu': {
    name: 'Zanele Ndlovu', role: 'Support Agent', team: 'Kagiso de Villiers',
    qa_w5: 85.8, qa_w1: 78.4, pa: 57.8, rr: 100.0, cf: 0,
    qa_series: [78.4, 80.3, 80.8, 87.0, 85.8], status: 'Watch',
    insight: 'Zanele demonstrated strong technical proficiency and ownership, achieving perfect resolution rate (100%) and strong CSAT. Process adherence improved from 15.6% to 57.8% following verification compliance coaching. The remaining gaps are explicit empathy and completing the issue confirmation and documentation steps consistently.',
    coaching: [
      { topic: 'Issue Confirmation and Documentation Steps', type: 'development',
        content: 'Zanele, your resolution rate is at 100% this week - merchants who call you get their issues resolved. That is the most important thing and you should feel good about it. The area to focus on is confirming the issue explicitly with the merchant before you start the resolution process: \'Just to confirm - you are experiencing X, is that right?\' It takes five seconds and prevents any possibility of working on the wrong thing. It also adds a moment of connection at the start of the call that sets the right tone.',
        evidence: 'Account lockout was mentioned by the merchant but not explicitly confirmed by the agent before proceeding.',
        lms: 'Issue Confirmation and Case Documentation' },
      { topic: 'Explicit Empathy in Account Security Contacts', type: 'development',
        content: 'Account lockouts and 2FA failures are genuinely stressful for merchants - they cannot access their business. Starting with an acknowledgement before the verification steps - \'I know being locked out is urgent, I am going to get this resolved for you right now\' - immediately reassures the merchant that they are in good hands. Your process compliance has improved significantly this period and your PII handling is clean. This is the last piece that will take your quality scores to the next level.',
        evidence: '"I will follow the approved alternative verification path. For security, I will only confirm partial account details." - technically correct but no empathy statement.',
        lms: 'Empathy in Account Security Interactions' }
    ],
    notes: [
      { from: 'Kagiso de Villiers', role: 'Team Lead', date: '2026-05-20', message: 'Zanele - perfect resolution rate this week. The PII compliance coaching has worked - no incidents in weeks 4 or 5. Two remaining areas: issue confirmation before proceeding, and empathy statements at the start of security calls. Process adherence is up from 15.6% to 57.8% which is excellent progress.' },
      { from: 'Zanele Ndlovu', role: 'Agent', date: '2026-05-21', message: 'Thank you. I will work on the issue confirmation step - I think I sometimes assume I know what the issue is. Will make sure to confirm explicitly.' }
    ]
  }
};

export const WK_LABELS = ['W1', 'W2', 'W3', 'W4', 'W5']

export const SPARK_DATA = [
  { name: 'Ayanda Mbeki', slug: 'ayanda-mbeki', w5: 95.7, series: [55.7, 56.5, 54.7, 94.9, 95.7] },
  { name: 'Busisiwe Maseko', slug: 'busisiwe-maseko', w5: 86.0, series: [80.3, 75.3, 90.4, 87.6, 86.0] },
  { name: 'Janine Jacobs', slug: 'janine-jacobs', w5: 100.0, series: [79.2, 73.0, 99.6, 100.0, 100.0] },
  { name: 'Lerato Nkosi', slug: 'lerato-nkosi', w5: 85.0, series: [72.2, 75.4, 72.6, 83.6, 85.0] },
  { name: 'Michael Naidoo', slug: 'michael-naidoo', w5: 99.9, series: [99.9, 100.0, 99.5, 99.9, 99.9] },
  { name: 'Nomsa Dlamini', slug: 'nomsa-dlamini', w5: 96.8, series: [75.8, 71.9, 73.4, 97.0, 96.8] },
  { name: 'Pieter Botha', slug: 'pieter-botha', w5: 94.8, series: [31.7, 31.1, 32.2, 94.9, 94.8] },
  { name: 'Sipho Khumalo', slug: 'sipho-khumalo', w5: 96.9, series: [44.3, 100.0, 45.2, 100.0, 96.9] },
  { name: 'Thabo van der Merwe', slug: 'thabo-van-der-merwe', w5: 97.2, series: [99.8, 99.7, 99.5, 98.1, 97.2] },
  { name: 'Zanele Ndlovu', slug: 'zanele-ndlovu', w5: 85.8, series: [78.4, 80.3, 80.8, 87.0, 85.8] }
];

export const SPARK_PREVIEW_SLUGS = [
  'lerato-nkosi',
  'busisiwe-maseko',
  'thabo-van-der-merwe',
  'sipho-khumalo',
]

export const COACHING_WEEK_INDEX = 2
export const DEFAULT_SLUG = 'ayanda-mbeki'
