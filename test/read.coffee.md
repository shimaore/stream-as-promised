    chai = require 'chai'
    chai.use require 'chai-as-promised'
    chai.should()

    seconds = 1000

    Promise = require 'bluebird'
    stream_as_promised = require '..'
    fs = require 'fs'

    describe 'When reading a file', ->
      it 'should have success', ->
        stream = fs.createReadStream '/etc/passwd'
        stream.pipe fs.createWriteStream '/dev/null'
        uut = stream_as_promised stream
        uut.should.be.fulfilled

      it 'should detect end', ->
        stream = fs.createReadStream '/etc/passwd'
        stream.pipe fs.createWriteStream '/dev/null'
        uut = stream_as_promised(stream).once 'end'
        uut.should.be.fulfilled

      it 'should miss inexisting events', ->
        stream = fs.createReadStream '/etc/passwd'
        stream.pipe fs.createWriteStream '/dev/null'
        uut = stream_as_promised(stream).once('foo').timeout 500
        uut.should.be.rejectedWith Promise.TimeoutError

      it 'should fail when needed', ->
        stream = fs.createReadStream '/etc/shadow'
        stream.pipe fs.createWriteStream '/dev/null'
        uut = stream_as_promised stream
        uut.should.be.rejectedWith Error

    describe 'When writing a file', ->
      it 'should have success', ->
        stream = fs.createReadStream '/etc/passwd'
        output = fs.createWriteStream '/dev/null'
        stream.pipe output
        uut = stream_as_promised output
        uut.should.be.fulfilled

      it 'should detect finish', ->
        stream = fs.createReadStream '/etc/passwd'
        output = fs.createWriteStream '/dev/null'
        stream.pipe output
        uut = stream_as_promised(output).once 'finish'
        uut.should.be.fulfilled

      it 'should fail when needed', ->
        stream = fs.createReadStream '/dev/null'
        output = fs.createWriteStream '/etc/shadow'
        stream.pipe output
        uut = stream_as_promised output
        uut.should.be.rejectedWith Error

      it 'should wait for drain', ->
        @timeout 20*seconds
        output = fs.createWriteStream '/dev/null'
        chunk = new Buffer 10*1000*1000
        uut = stream_as_promised output
        uut.stream.writeAsync chunk
        .then ->
          uut.stream.writeAsync chunk
        .then ->
          uut.stream.end()
