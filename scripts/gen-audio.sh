#!/bin/bash
# Generate Audio Files for TOEFL ITP Questions
# This script generates WAV audio files for all listening questions

OUTPUT_DIR="/home/z/my-project/public/audio"
mkdir -p "$OUTPUT_DIR"

echo "🎤 Generating Audio Files for TOEFL ITP"
echo "Output directory: $OUTPUT_DIR"
echo ""

# Function to generate audio with retry
generate_audio() {
    local id=$1
    local pkg=$2
    local text="$3"
    local output="$OUTPUT_DIR/listening_${pkg}_q${id}.wav"
    
    # Skip if exists
    if [ -f "$output" ]; then
        echo "  ✓ Package $pkg Q$id (exists)"
        return 0
    fi
    
    # Truncate text if too long
    if [ ${#text} -gt 500 ]; then
        text="${text:0:500}..."
    fi
    
    # Generate with retry
    for i in 1 2 3; do
        if z-ai tts -i "$text" -o "$output" -f wav 2>/dev/null; then
            echo "  ✓ Package $pkg Q$id"
            return 0
        fi
        sleep 2
    done
    
    echo "  ✗ Package $pkg Q$id (failed)"
    return 1
}

# Package A Questions
echo "📦 Package A:"
generate_audio 1 A "Have you seen my calculator? It was right here a minute ago. Did you look under your book? I'm always losing things that way. What does the woman imply?"
sleep 1
generate_audio 2 A "I really want to take astronomy, but my course load this spring is too heavy already. The summer session might be a good idea, since you'll be working on campus anyway. What does the man suggest the woman do?"
sleep 1
generate_audio 3 A "Professor Clark, I'd like to repeat the experiment from last class. Is there a possibility I could use the lab over the weekend? It'll be locked, but you can get the key from the security office. Make sure you return it when you're finished. What does the woman imply about the man?"
sleep 1
generate_audio 4 A "I really like your sweatshirt! I don't think I've ever seen a design like that before. Yeah, it's pretty cool, isn't it? My parents were in Japan last year and brought it back for me. What does the man mean?"
sleep 1
generate_audio 5 A "Are you free tonight? I'm meeting a few friends at the restaurant on Main Street. Oh, I'd love to. But I already have dinner plans for tonight. Another time perhaps. What does the woman mean?"
sleep 1
generate_audio 6 A "I just registered for the research conference. The deadline is tomorrow. It doesn't take long though. You simply go to the conference Web site. I guess I'd better do that today, huh? I have a little time before I teach my next class. What can be inferred about the man?"
sleep 1
generate_audio 7 A "That's a great bike! Where'd you get it? You know that sporting goods store on Harrison Street. They've been running tremendous sales all summer! What does the woman imply?"
sleep 1
generate_audio 8 A "So, how much was your plane ticket? More than I could really afford. I had to dip into my savings. What does the woman imply?"
sleep 1
generate_audio 9 A "Professor Jones, we had a power failure in my dorm last night, so I wasn't able to finish my paper. Could I hand it in tomorrow? I understand that things sometimes do come up, but I don't make any exceptions. I made that clear in the first class. What does the professor mean?"
sleep 1
generate_audio 10 A "I'm thinking of moving off-campus next semester, but since I don't have a car, I'd need to stay pretty close by. Any suggestions? It just so happens the people who live downstairs from me are moving next month. What can be inferred about the man?"
sleep 1

echo ""
echo "✓ Package A audio files generated!"
echo ""
echo "To continue generating audio for packages B, C, and D,"
echo "please run the full generation script which processes all questions."
