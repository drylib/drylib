namespace DRYLib {
   public class License {
      public string terms { get {return @"
*******************************************************************************
        Copyright (c) 2015 drylib.com - All rights reserved.

    Copyright Holder (Author) contact info for licensing:
      email author@drylib.com with word ""license"" in email subject line

    Contact info for questions and support:
      email author@drylib.com with word ""support"" in email subject line

 You are NOT ALLOWED to use or modify any part of this Software Library without
 email message from author @drylib.com(the Email) that explicitly grants
 permission to you.However you are allowed to read the source code and
 execute in non - production environment for software evaluation purpose during
   30 days time period with interval between evaluations not less than 90 days.

   The Email must be from author @drylib.com and must state scope of granted
   permissions and target.Scope identifies what you can do, for example,
  make API calls, modify source code, sell as part of your product, etc.
  Target identifies who got that permission, for example, your name and email
  address or name of your business or your website or your crypto public key.

 The Email must have Authentication-Results header that contains all of the
 following substrings:
               1) spf=pass
               2) smtp.mail=author @drylib.com
               3) dkim=pass header.i=@drylib.com
 and DKIM-Signature header that contains all of the following substrings:
               4) a=rsa-sha256;
               5) d=drylib.com;
               6) s=google;
               7) h=mime-version:date:message-id:subject:from:to:content-type;

         If any of these 7 items is missing you MAY NOT consider permission granted.

 You must retain evidence of granted permission for as long as you use this
 Software Library.

 For explanation of Authentication-Results and DKIM-Signature headers see:
 http://en.wikipedia.org/wiki/Email_authentication#Authentication-Results
 http://en.wikipedia.org/wiki/DomainKeys_Identified_Mail#How_it_works
 http://tools.ietf.org/html/rfc7001#ref-DKIM


 THE SOFTWARE IS PROVIDED ""AS IS"", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.IN NO EVENT SHALL THE
 AUTHOR OR COPYRIGHT HOLDER BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE.

*******************************************************************************
";

         }
}
   }
}
